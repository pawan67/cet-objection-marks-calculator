import { Input } from '@/components/ui/input';

interface Props {
    onUpload: (fileContent: string) => void;
}

export function FileUploader({ onUpload }: Props) {
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = event => {
            const html = event.target?.result as string;
            onUpload(html);
        };
        reader.readAsText(file);
    };

    return (
        <>
            <label htmlFor='file'>Choose New File</label>
            <Input
                id='file'
                type='file'
                accept='text/html'
                onChange={handleFileUpload}
                className='mt-5 block'
            />
        </>
    );
}

export default FileUploader;
