import { render, screen } from "@testing-library/react";
import Links from "./Links";

describe("Links", () => {
  test("renders all links with correct href and target attributes", () => {
    render(<Links />);

    const githubLink = screen.getByText("Github");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://www.Github.com/Adebisi1234/"
    );
    expect(githubLink).toHaveAttribute("target", "_blank");

    const twitterLink = screen.getByText("Twitter");
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute(
      "href",
      "https://www.Twitter.com/AdebisiTobil"
    );
    expect(twitterLink).toHaveAttribute("target", "_blank");

    const emailLink = screen.getByText("Email");
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:oluwatobilobaadebisi@gmail.com"
    );
    expect(emailLink).toHaveAttribute("target", "_blank");
  });
});
