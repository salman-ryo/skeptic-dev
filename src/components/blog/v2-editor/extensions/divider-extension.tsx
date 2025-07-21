import { Node, mergeAttributes } from "@tiptap/core"

export interface DividerOptions {
  HTMLAttributes: Record<string, any>
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    divider: {
      setDivider: () => ReturnType
    }
  }
}

export const DividerExtension = Node.create<DividerOptions>({
  name: "divider",

  group: "block",

  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  parseHTML() {
    return [
      {
        tag: "hr[data-divider]",
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "hr",
      mergeAttributes(
        {
          "data-divider": "",
          class: "divider-line",
        },
        this.options.HTMLAttributes,
        HTMLAttributes,
      ),
    ]
  },

  addCommands() {
    return {
      setDivider:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
          })
        },
    }
  },
})
