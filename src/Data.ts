
export type Iginio = {
    name: string
    repository: string
    description: string
    versions: {
      version: string
      file: {
        type: "BIN" | "LINK"
        raw: string
        extra?: string
      }
    }[]
    author: string
    logo?: string
    banner?: string
    tags: string[]
  }
export const mockIgnios: Iginio[] = [
    {
      name: "ExampleMod",
      repository: "https://github.com/example/examplemod",
      description: "This is an example mod that showcases various features of Ignite.",
      versions: [
        {
          version: "1.20.4",
          file: {
            type: "LINK",
            raw: "https://example.com/examplemod-1.20.4.jar"
          }
        },
        {
          version: "1.20.2",
          file: {
            type: "LINK",
            raw: "https://example.com/examplemod-1.20.2.jar"
          }
        },
        {
          version: "1.19.4",
          file: {
            type: "LINK",
            raw: "https://example.com/examplemod-1.19.4.jar"
          }
        },
        {
          version: "1.19.2",
          file: {
            type: "BIN",
            raw: "1010010101001010100101010010101010010101001010101001010100101010",
            extra: "examplemod-1.19.2.zip"
          }
        }
      ],
      author: "https://github.com/exampleauthor",
      tags: ["vanilla", "1.20.1", "optimization"]
    },
    {
      name: "AnotherMod",
      repository: "https://github.com/example/anothermod",
      description: "This is another example mod with different features.",
      versions: [
        {
          version: "1.20.4",
          file: {
            type: "LINK",
            raw: "https://example.com/anothermod-1.20.4.jar"
          }
        }
      ],
      author: "https://github.com/anotherauthor",
      tags: ["1.20.4", "gameplay", "adventure"]
    }
  ]