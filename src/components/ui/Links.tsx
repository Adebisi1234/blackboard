import DialogItem from "./dialog/DialogItem";

export default function Links() {
  return (
    <>
      <DialogItem>
        <p className="w-full">
          <a
            href="https://www.Github.com/Adebisi1234/"
            target="_blank"
            className="w-full inline-block"
          >
            Github
          </a>
        </p>
      </DialogItem>
      <DialogItem>
        <p className="w-full">
          <a
            href="https://www.Twitter.com/AdebisiTobil"
            target="_blank"
            className="w-full inline-block"
          >
            Twitter
          </a>
        </p>
      </DialogItem>
      <DialogItem>
        <p className="w-full">
          <a
            href="mailto:oluwatobilobaadebisi@gmail.com"
            target="_blank"
            className="w-full inline-block"
          >
            Email
          </a>
        </p>
      </DialogItem>
    </>
  );
}
