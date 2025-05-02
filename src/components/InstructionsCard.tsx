import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function InstructionsCard() {
    return (
        <Card className='mt-5'>
            <CardHeader className='text-2xl font-bold'>How to Use⁉️</CardHeader>
            <CardContent>
                <h4 className='font-medium'> 💻 For Desktop Users:</h4>
                <ul className='mt-3'>
                    <li>
                        1. Open the{' '}
                        <a
                            href='https://portal.maharashtracet.org/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='font-semibold text-blue-400 underline'>
                            CET portal
                        </a>{' '}
                        and log in.
                    </li>
                    <li>
                        2. Go to the objection URL and press <strong>Ctrl + S</strong> to save the
                        page.
                    </li>
                    <li>3. Upload the saved file here.</li>
                </ul>

                <h4 className='mt-6 font-medium'>📱 For Mobile Users:</h4>
                <ul className='mt-3'>
                    <li>
                        1. Open the{' '}
                        <a
                            href='https://portal.maharashtracet.org/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='font-semibold text-blue-400 underline'>
                            CET portal
                        </a>{' '}
                        in the Chrome app on your Android device and log in.
                    </li>
                    <li>2. Go to the objection URL</li>
                    <li>
                        3. Tap the three-dot menu (⋮) in the top-right corner and select{' '}
                        <strong>"Download"</strong> or <strong>"Save as"</strong> to save the page
                        as an <code>.htm</code> file.
                    </li>
                    <li>4. Upload the downloaded file here.</li>
                    <li className='mt-3 text-muted-foreground'>
                        Created by{' '}
                        <a
                            href='https://www.linkedin.com/in/pawan67/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='font-semibold text-blue-400 underline'>
                            Pawan Tamada :)
                        </a>
                    </li>
                </ul>
            </CardContent>
        </Card>
    );
}
