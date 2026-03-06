export default function TLDR() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">TL;DR</h2>
      <p>
        <b>Currently I am...</b> <br /> studying
        {" "}
        <a
          onClick={() => scrollToSection("education")}
          className="text-primary hover:underline cursor-pointer"
        >
          Computer Science at Rutgers University - New Brunswick
        </a>
        , supervising at the
        {" "}
        <a
          onClick={() => scrollToSection("werblin")}
          className="text-primary hover:underline cursor-pointer"
        >
          Werblin Recreation Center at Rutgers
        </a>
        , founder of
        {" "}
        <a
          onClick={() => scrollToSection("runclub")}
          className="text-primary hover:underline cursor-pointer"
        >
          the Rutgers Run Club
        </a>
        , building
        {" "}
        <a
          href="https://github.com/ameer-rah/ruplanner"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline cursor-pointer"
        >
          RUPlanner
        </a>
        , and
        {" "}
        <a
          href="/reading-list"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          reading
        </a>
        <br /><b>Not so currently, I am...</b><br />
        hosting car shows, going to the gym with my friends, and working on side projects
      </p>
    </div>
  );
}
