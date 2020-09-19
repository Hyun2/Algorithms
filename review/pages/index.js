import fs from "fs";
import path from "path";

export default ({ md }) => {
  return <div>{md}</div>;
};

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
      for (const file of result) {
        files.push(path.join("algorithms", dir, file));
      }
    }
  }
  console.log(files);
  const idx = Math.floor(Math.random() * files.length);
  console.log(files[idx]);
  const filename = files[idx];

  const md = fs.readFileSync(filename).toString();

  return {
    props: {
      md,
    },
  };

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
