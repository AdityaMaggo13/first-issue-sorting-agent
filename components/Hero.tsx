import { Button } from '@/components/ui/Button'
import { TextInput } from '@/components/ui/TextInput'
import { Select } from '@/components/ui/Select'

export interface HeroValues {
  skills: string
  level: string
  interest: string
}

export interface HeroProps {
  values: HeroValues
  onChange: (values: HeroValues) => void
  onSubmit: () => void
  loading?: boolean
}

const interestOptions = [
  'Web Development',
  'Machine Learning', 
  'DevOps',
  'Mobile Development',
  'Data Science',
  'Backend Development',
  'Frontend Development',
  'Infrastructure',
  'Security',
  'Testing'
]

export function Hero({ values, onChange, onSubmit, loading }: HeroProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Hero content */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
              Find Your Perfect
              <span className="text-blue-600 block">First Issue</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover curated GitHub issues tailored to your skills, experience level, and interests. 
              Start your open source journey with confidence.
            </p>
          </div>

          {/* Search form */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Skills field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                      Your Skills
                    </label>
                    <TextInput
                      placeholder="e.g., React, Python, TypeScript"
                      value={values.skills}
                      onChange={(e) => onChange({ ...values, skills: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  {/* Level field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                      Experience Level
                    </label>
                    <Select
                      value={values.level}
                      onChange={(e) => onChange({ ...values, level: e.target.value })}
                      className="w-full"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </Select>
                  </div>

                  {/* Interest field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 block">
                      Interest Area
                    </label>
                    <Select
                      value={values.interest}
                      onChange={(e) => onChange({ ...values, interest: e.target.value })}
                      className="w-full"
                    >
                      {interestOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>

                {/* Submit button */}
                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit" 
                    size="lg"
                    loading={loading}
                    disabled={loading || !values.skills.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Finding Issues...</span>
                      </div>
                    ) : (
                      'Find Perfect Issues'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10K+</div>
              <div className="text-gray-600 mt-1">Issues Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">50+</div>
              <div className="text-gray-600 mt-1">Popular Repositories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">100%</div>
              <div className="text-gray-600 mt-1">AI-Free Ranking</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
