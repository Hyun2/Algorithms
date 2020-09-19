import { useEffect } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";
import hljs from "highlight.js";
// import "highlight.js/styles/github.css";

export default ({ md, data, input, content }) => {
  useEffect(() => {
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
  }, []);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: input }} />
      <div>{data.input}</div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export const getStaticProps = async (ctx) => {
  marked.setOptions({
    highlight: function (code, lang) {
      return hljs.highlight(lang, code).value;
    },
  });

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
  const mdMatter = matter(md);
  console.log(mdMatter.data.input);
  const input = marked(mdMatter.data.input);
  const content = marked(mdMatter.content);
  return {
    props: {
      md,
      data: mdMatter.data,
      input,
      content,
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
