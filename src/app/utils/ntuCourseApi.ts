import { parse } from "node-html-parser";
import { GetCourseResponse } from "./types";

export const login = async (username: string, password: string) => {
  const resSAML = await fetch("https://course.ntu.edu.tw/login");

  if (!resSAML.ok)
    throw new Error(`Initial SAML fetch failed: ${resSAML.status}`);

  const samlHtml = parse(await resSAML.text());
  const credentialFormData = new URLSearchParams();

  const formInputs = samlHtml.querySelectorAll("form input");
  if (!formInputs.length)
    throw new Error("No input fields found in initial form");

  formInputs.forEach((i) => {
    const { name, value } = i.attributes;
    credentialFormData.append(name, value);
  });

  const form1 = samlHtml.querySelector("form");
  if (!form1) throw new Error("Form element not found in initial HTML");

  const { method: method1, action: action1 } = form1.attributes;

  credentialFormData.set("ctl00$ContentPlaceHolder1$UsernameTextBox", username);
  credentialFormData.set("ctl00$ContentPlaceHolder1$PasswordTextBox", password);

  const resLogin = await fetch("https://adfs.ntu.edu.tw" + action1, {
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: credentialFormData,
    method: method1,
    redirect: "manual",
  });

  const redirect1 = resLogin.headers.get("Location");
  const cookies1 = resLogin.headers.getSetCookie();
  if (!redirect1 || !cookies1)
    throw new Error("Missing redirect or cookies after login form submit");

  const resSAML2 = await fetch(redirect1, {
    headers: {
      cookie: cookies1.join("; "),
    },
  });

  const saml2Html = parse(await resSAML2.text());
  const form2 = saml2Html.querySelector("form");
  if (!form2) throw new Error("SAML2 form not found");

  const { method: method2, action: action2 } = form2.attributes;
  const loginFormData = new URLSearchParams();

  saml2Html.querySelectorAll("form input").forEach((i) => {
    const { name, value } = i.attributes;
    loginFormData.append(name, value);
  });

  const loginRes = await fetch(action2, {
    body: loginFormData,
    method: method2,
    redirect: "manual",
  });

  const redirect2 = loginRes.headers.get("Location");
  const cookies2 = loginRes.headers.getSetCookie();
  if (!redirect2 || !cookies2)
    throw new Error("Final redirect or cookies missing");

  const finalRes = await fetch(redirect2, {
    headers: {
      cookie: cookies2.join("; "),
    },
    redirect: "manual",
  });

  const NTUCourseToken = finalRes.headers
    .getSetCookie()
    .find((s) => s.startsWith("auth="))
    ?.split(";")[0]
    ?.replace("auth=", "");

  if (!NTUCourseToken) throw new Error("NTU Course token not found");

  return NTUCourseToken;
};

export const getFinalCourses = async (
  NTUCourseToken: string,
  lang: "en_US" | "zh_TW" = "en_US"
): Promise<GetCourseResponse> =>
  fetch(
    `https://course.ntu.edu.tw/api/v3/course-tables/result/113-2/Final?withCourse=true&lang=${lang}`,
    {
      headers: {
        authorization: "JWT " + NTUCourseToken,
      },
      method: "GET",
    }
  ).then((res) => res.json());
