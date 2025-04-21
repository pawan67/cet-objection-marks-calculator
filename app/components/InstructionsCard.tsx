import { Card, CardHeader, CardContent } from "~/components/ui/card";

export function InstructionsCard() {
  return (
    <Card className="mt-5">
      <CardHeader>How to Use</CardHeader>
      <CardContent>
        <ul>
          <li>
            1. Open the{" "}
            <a
              href="https://portal.maharashtracet.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline font-semibold"
            >
              CET portal
            </a>{" "}
            and log in.
          </li>
          <li>2. Go to the objection URL and press <strong>Ctrl + S</strong> to save the page.</li>
          <li>3. Upload the saved file here.</li>
          <li className="mt-3 text-muted-foreground">
            Created by{" "}
            <a
              href="https://www.linkedin.com/in/pawan67/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline font-semibold"
            >
              Pawan Tamada :)
            </a>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}


