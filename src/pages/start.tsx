import { useCallback, useState } from 'react'

import { SEOHead } from '@/components/SEOHead'
import { IntakeForm } from '@/components/IntakeForm'
import { PathwayDashboard } from '@/components/PathwayDashboard'
import { useWizardState } from '@/hooks/useWizardState'

import type { WizardState } from '@/types/content'

export default function StartPage() {
  const { wizardState, setWizardState, isComplete, pathway, reset, hydrated } = useWizardState()
  const [editing, setEditing] = useState(false)

  const handleComplete = useCallback(
    (state: WizardState) => {
      setWizardState(state)
      setEditing(false)
    },
    [setWizardState]
  )

  const handleChangeSelections = useCallback(() => {
    setEditing(true)
  }, [])

  if (!hydrated) {
    return (
      <>
        <SEOHead
          title="My Pathway"
          description="Your personalized Oregon therapist credentialing pathway."
          path="/start"
        />
        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-sm text-gray-500">Loading your pathway...</p>
        </div>
      </>
    )
  }

  if (!isComplete || editing) {
    return (
      <>
        <SEOHead
          title="Get Started"
          description="Answer three questions to receive your personalized Oregon therapist credentialing pathway."
          path="/start"
        />
        <IntakeForm
          onComplete={handleComplete}
          initialValues={isComplete ? wizardState : undefined}
        />
      </>
    )
  }

  return (
    <>
      <SEOHead
        title="My Pathway"
        description="Your personalized Oregon therapist credentialing pathway."
        path="/start"
      />
      <PathwayDashboard
        wizardState={wizardState}
        pathway={pathway}
        onChangeSelections={handleChangeSelections}
      />
    </>
  )
}
