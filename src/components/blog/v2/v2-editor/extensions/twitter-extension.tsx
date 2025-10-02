import { Node, mergeAttributes } from "@tiptap/core"

export interface TwitterOptions {
  HTMLAttributes: Record<string, any>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    twitter: {
      setTwitterEmbed: (options: { url: string }) => ReturnType
    }
  }
}

export const TwitterExtension = Node.create<TwitterOptions>({
  name: "twitter",

  group: "block",

  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      url: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "div[data-twitter-embed]",
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(
        {
          "data-twitter-embed": "",
          class: "twitter-embed-wrapper",
        },
        this.options.HTMLAttributes,
        HTMLAttributes,
      ),
      [
        "blockquote",
        {
          class: "twitter-tweet",
        },
        [
          "a",
          {
            href: HTMLAttributes.url,
            target: "_blank",
            rel: "noopener noreferrer",
          },
          "View Tweet",
        ],
      ],
    ]
  },

  addCommands() {
    return {
      setTwitterEmbed:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },
})
