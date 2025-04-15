import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/joy';









//TODO needs refactor
//TODO needs refactor
//TODO needs refactor
//TODO needs refactor
//TODO needs refactor
//TODO needs refactor
const days = ['一', '二', '三', '四', '五'];
const intervalHeight = 100; // increased height
const scheduleSlots: Record<interval, { start: { hour: number; minute: number }; end: { hour: number; minute: number } }> = {
    "0": { start: { hour: 7, minute: 10 }, end: { hour: 8, minute: 0 } },
    "1": { start: { hour: 8, minute: 10 }, end: { hour: 9, minute: 0 } },
    "2": { start: { hour: 9, minute: 10 }, end: { hour: 10, minute: 0 } },
    "3": { start: { hour: 10, minute: 20 }, end: { hour: 11, minute: 10 } },
    "4": { start: { hour: 11, minute: 20 }, end: { hour: 12, minute: 10 } },
    "5": { start: { hour: 12, minute: 20 }, end: { hour: 13, minute: 10 } },
    "6": { start: { hour: 13, minute: 20 }, end: { hour: 14, minute: 10 } },
    "7": { start: { hour: 14, minute: 20 }, end: { hour: 15, minute: 10 } },
    "8": { start: { hour: 15, minute: 30 }, end: { hour: 16, minute: 20 } },
    "9": { start: { hour: 16, minute: 30 }, end: { hour: 17, minute: 20 } },
    "X": { start: { hour: 17, minute: 30 }, end: { hour: 18, minute: 20 } },
    "A": { start: { hour: 18, minute: 25 }, end: { hour: 19, minute: 15 } },
    "B": { start: { hour: 19, minute: 20 }, end: { hour: 20, minute: 10 } },
    "C": { start: { hour: 20, minute: 15 }, end: { hour: 21, minute: 5 } },
    "D": { start: { hour: 21, minute: 10 }, end: { hour: 22, minute: 0 } },
};
type interval = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "X" | "A" | "B" | "C" | "D"
type Course = {
    name: string;
    location?: string;
    weekday: number;
    intervals: interval[],
    start: { hour: number; minute: number };
    end: { hour: number; minute: number };
};

type ScheduleCardProps = {
    course: Course;
};

type WeeklyScheduleProps = {
    courses: Course[];
};

const ScheduleCard: React.FC<ScheduleCardProps> = ({ course }) => {
    const verticalPadding=4
    const top = (Object.entries(scheduleSlots).findIndex((it) => it[0] === course.intervals[0])) * intervalHeight + 30+verticalPadding;
    const height = (course.intervals.length) * intervalHeight-verticalPadding;

    return (
        <Card
            variant="soft"
            color="primary"
            sx={{
                
                position: 'absolute',
                top,
                left: 4,
                right: 4,
                height,
                p: { xs: 0.5, sm: 1 },
                fontSize: { xs: '0.7rem', sm: '0.9rem' },
                overflow: 'hidden',
                backgroundColor: 'primary.softBg',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderRadius: 'lg',
            }}
        >
            <CardContent sx={{ overflow: 'hidden' }}>
                <Typography level="title-sm" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{course.name}</Typography>
                <Typography level="body-sm" noWrap>{course.location || '—'}</Typography>
                <Typography level="body-sm">
                    {course.start.hour}:{course.start.minute.toString().padStart(2, '0')} - {course.end.hour}:{course.end.minute.toString().padStart(2, '0')}
                </Typography>
            </CardContent>
        </Card>
    );
};

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ courses }) => {
    const totalHeight = Object.entries(scheduleSlots).length * intervalHeight + 30;

    return (
        <Box sx={{ display: 'flex', maxWidth: 850, width: '100%', mx: 'auto', borderRadius: 'lg', overflow: 'hidden', border: '1px solid #ccc' }}>
            <Box sx={{ width: 100, borderRight: '1px solid #ccc', backgroundColor: '#fafafa' }}>
                <Box sx={{ height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>
                    <Typography level="title-sm">節次</Typography>
                </Box>
                {Object.entries(scheduleSlots).map(([key, slot], i, arr) => (
                    <Box
                        key={key}
                        sx={{
                            height: intervalHeight,
                            px: 0.5,
                            borderBottom: i < arr.length - 1 ? '1px dashed #ccc' : 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '0.65rem',
                            textAlign: 'center',
                        }}
                    >
                        <Typography fontWeight="bold">{key}</Typography>
                        <Typography>{slot.start.hour}:{slot.start.minute.toString().padStart(2, '0')}</Typography>
                        <Typography>{slot.end.hour}:{slot.end.minute.toString().padStart(2, '0')}</Typography>
                    </Box>
                ))}
            </Box>

            <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', position: 'relative' }}>
                {days.map((day, idx) => (
                    <Box key={idx} sx={{ borderLeft: '1px solid #ccc', position: 'relative', height: totalHeight, overflow: 'hidden' }}>
                        <Box sx={{ height: 30, backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 0, zIndex: 2 }}>
                            <Typography level="title-sm" sx={{ textAlign: 'center', fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                                星期{day}
                            </Typography>
                        </Box>
                        {courses
                            .filter((c) => c.weekday === idx + 1)
                            .map((c, i) => (
                                <ScheduleCard key={i} course={c} />
                            ))}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default WeeklySchedule;
