import { useCallback } from 'react'
import { useConversationCommentCreateMutation } from '@/BrickdocGraphQL'
import { DiscussionOptions } from '@brickdoc/editor'
import { DocMeta } from '@/docs/store/DocMeta'
import { conversationToData } from './useDiscussion'

export function useCreateConversation(docMeta: DocMeta): DiscussionOptions['createConversation'] {
  const [createConversationComment] = useConversationCommentCreateMutation()

  return useCallback<NonNullable<DiscussionOptions['createConversation']>>(
    async (markId, content) => {
      if (!docMeta.id) return { success: false, data: { conversation: null } }

      const { data } = await createConversationComment({
        variables: {
          input: {
            content,
            docId: docMeta.id,
            markIds: [markId]
          }
        }
      })

      return {
        success: (data?.conversationCommentCreate?.errors.length ?? 0) === 0,
        data: {
          conversation: conversationToData(data?.conversationCommentCreate?.conversation)
        }
      }
    },
    [createConversationComment, docMeta.id]
  )
}