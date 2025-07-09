'use client'

import type React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { Flag, Reply, ThumbsDown, ThumbsUp } from 'lucide-react'

import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { formatDate } from '@/lib/utils'

interface Comment {
  id: string
  author: {
    name: string
    imageUrl: string
  }
  content: string
  date: string
  likes: number
  dislikes: number
  replies?: Comment[]
}

interface CommentSectionProps {
  postSlug: string
  initialComments?: Comment[]
  className?: string
}

export function CommentSection({ postSlug, initialComments = [], className }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a comment',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real application, you would send this to your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newCommentObj: Comment = {
        id: Date.now().toString(),
        author: {
          name: 'You',
          imageUrl:
            'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
        },
        content: newComment,
        date: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
      }

      setComments([newCommentObj, ...comments])
      setNewComment('')

      toast({
        title: 'Success!',
        description: 'Your comment has been posted.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to post your comment. Please try again later.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLike = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 }
        }
        return comment
      })
    )
  }

  const handleDislike = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, dislikes: comment.dislikes + 1 }
        }
        return comment
      })
    )
  }

  const renderComment = (comment: Comment, isReply = false) => (
    <div
      key={comment.id}
      className={`${isReply ? 'ml-12 mt-4' : 'mb-6 border-b border-gray-200 pb-6 dark:border-gray-800'}`}
    >
      <div className="flex items-start">
        <div className="relative mr-4 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
          <Image
            src={comment.author.imageUrl || '/placeholder.svg'}
            alt={comment.author.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="mb-1 flex items-center">
            <h4 className="font-medium">{comment.author.name}</h4>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              {formatDate(comment.date)}
            </span>
          </div>

          <p className="mb-3 text-gray-700 dark:text-gray-300">{comment.content}</p>

          <div className="flex items-center space-x-4 text-sm">
            <button
              onClick={() => handleLike(comment.id)}
              className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <ThumbsUp className="mr-1 h-4 w-4" />
              {comment.likes > 0 && <span>{comment.likes}</span>}
            </button>

            <button
              onClick={() => handleDislike(comment.id)}
              className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <ThumbsDown className="mr-1 h-4 w-4" />
              {comment.dislikes > 0 && <span>{comment.dislikes}</span>}
            </button>

            <button className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <Reply className="mr-1 h-4 w-4" />
              Reply
            </button>

            <button className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <Flag className="mr-1 h-4 w-4" />
              Report
            </button>
          </div>
        </div>
      </div>

      {comment.replies && comment.replies.map((reply) => renderComment(reply, true))}
    </div>
  )

  return (
    <div className={className}>
      <h3 className="mb-6 bg-gradient-to-r from-gray-800 to-gray-500 bg-clip-text text-xl font-bold text-transparent dark:from-gray-200 dark:to-gray-500">
        Comments ({comments.length})
      </h3>

      <form onSubmit={handleSubmitComment} className="mb-8">
        <Textarea
          placeholder="Leave a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-3 min-h-[100px]"
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </form>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="py-8 text-center text-gray-600 dark:text-gray-400">
            Be the first to comment on this post!
          </p>
        ) : (
          comments.map((comment) => renderComment(comment))
        )}
      </div>
    </div>
  )
}
