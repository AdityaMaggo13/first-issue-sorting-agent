'use client'

import { useState } from 'react'
import { PageShell } from '@/components/PageShell'
import { Hero, type HeroValues } from '@/components/Hero'
import IssueCard from '@/components/IssueCard'

interface Issue {
  id: number
  title: string
  html_url: string
  repo_name: string
  labels: string[]
  reactions: number
  comments: number
}

export default function Home() {
  const [skills, setSkills] = useState('')
  const [level, setLevel] = useState('Beginner')
  const [interest, setInterest] = useState('Web Development')
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    setIssues([])

    try {
      console.log('FIND ISSUES CLICKED')

      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skills,
          level,
          interest,
        }),
      })

      const data = await response.json()
      console.log('API RESPONSE:', data)

      if (!response.ok) {
        setError(data.message || 'Failed to fetch recommendations')
        setIssues([])
      } else {
        setIssues(data.issues || [])
        if (data.issues?.length === 0) {
          setError(data.message || 'No issues found matching your criteria')
        }
      }
    } catch (error) {
      console.error('Error fetching issues:', error)
      setError('Failed to connect to the server. Please try again.')
      setIssues([])
    } finally {
      setLoading(false)
    }
  }

  const handleHeroChange = (values: HeroValues) => {
    setSkills(values.skills)
    setLevel(values.level)
    setInterest(values.interest)
  }

  return (
    <PageShell>
      {/* Hero section with search form */}
      <Hero
        values={{ skills, level, interest }}
        onChange={handleHeroChange}
        onSubmit={handleSubmit}
        loading={loading}
      />

      {/* Results section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section header */}
        {(issues.length > 0 || error) && (
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Recommended Issues
            </h2>
            <p className="text-lg text-gray-600">
              Based on your skills, level, and interest
            </p>
            {issues.length > 0 && (
              <p className="text-sm text-gray-500">
                Found {issues.length} matching issues
              </p>
            )}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-base">{error}</p>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr items-stretch">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="animate-pulse">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="flex space-x-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <div className="h-4 bg-gray-200 rounded w-12"></div>
                      <div className="h-4 bg-gray-200 rounded w-12"></div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Issues grid */}
        {issues.length > 0 && !loading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr items-stretch">
            {issues.map(issue => (
              <IssueCard
                key={issue.id.toString()}
                id={issue.id}
                title={issue.title}
                url={issue.html_url}
                repo_name={issue.repo_name}
                labels={issue.labels}
                reactions={issue.reactions}
                comments={issue.comments}
                level={level}
              />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  )
}
