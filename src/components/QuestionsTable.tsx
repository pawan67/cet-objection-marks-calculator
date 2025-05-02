import { Card } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { getSubjectWiseSummary, type ParsedQuestion } from '@/lib/subjectSummary';
import { getOverallMarks } from '@/lib/totalSummay';

export function QuestionsTable({ data }: { data: ParsedQuestion[] }) {
    const overall = getOverallMarks(getSubjectWiseSummary(data));
    console.log('Overall:', overall);

    return (
        <Card className='my-5'>
            
            <Table>
                <TableCaption>A total of {data.length} questions</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[100px]'>Question ID</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Correct Option</TableHead>
                        <TableHead>User Option</TableHead>
                        <TableHead>Is Correct</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map(item => (
                        <TableRow
                            className={item.isCorrect ? '' : 'bg-destructive/20'}
                            key={item.questionId}>
                            <TableCell className='font-medium'>{item.questionId}</TableCell>
                            <TableCell>{item.subject}</TableCell>
                            <TableCell>{item.correctOption}</TableCell>
                            <TableCell>{item.userOption}</TableCell>
                            <TableCell>{item.isCorrect ? 'Right' : 'Wrong'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4}>Total</TableCell>
                        <TableCell className='text-right'>
                            {overall.totalCorrectAnswers} / {overall.totalQuestions}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </Card>
    );
}

export default QuestionsTable;
