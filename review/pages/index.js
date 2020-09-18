import fs from "fs";
import path from "path";

export default function Home() {
  return <div></div>;
}

export const getStaticProps = async (ctx) => {
  const dirs = fs
    .readdirSync("algorithms")
    .filter((dir) => !dir.includes(".md"));
  console.log(dirs);

  let files = [];

  for (const dir of dirs) {
    const result = fs
      .readdirSync(path.join("algorithms", dir))
      .filter((file) => file.includes(".md") && !file.includes("기본개념.md"));

    if (result) {
      files.push(...result);
    }
  }
  console.log(files);

  return { props: {} };

  // const markdownWithMetadata = fs
  //   .readFileSync(path.join("posts", slug + ".md"))
  //   .toString();
  // const parsedMarkdown = matter(markdownWithMetadata);
  // const htmlString = marked(parsedMarkdown.content);
  // return {
  //   props: {
  //     htmlString,
  //     data: parsedMarkdown.data,
  //   },
  // };
};
