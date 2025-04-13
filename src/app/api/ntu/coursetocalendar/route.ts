import { courseToCalendar } from "@/app/utils/courseToCalendar";
import { getFinalCourses, login } from "@/app/utils/ntuCourseApi";

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const lang = formData.get("lang") as "zh_TW" | "en_US";
  try {
    const NTUCourseToken = await login(username, password);
    const courseResponse = await getFinalCourses(NTUCourseToken, lang);
    const icalString = courseToCalendar(courseResponse);
    return new Response(icalString, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="ntu_calendar.ics"',
      },
    });
  } catch (error) {
    return Response.json({ error: "login error" }, { status: 500 });
  }
}
