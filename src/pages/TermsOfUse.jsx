import PageScaffold from '../components/layout/PageScaffold'
import SectionWrapper from '../components/ui/SectionWrapper'
import GlowCard from '../components/ui/GlowCard'

const TermsOfUse = () => (
  <PageScaffold>
    <SectionWrapper title="Terms of Use" subtitle="By using TechMNHub, you agree to these platform terms." maxWidth="max-w-4xl">
      <GlowCard className="space-y-4 p-6" floating={false} hoverScale={1.005}>
        <div className="space-y-3 text-sm text-[#A0A0A0]">
          <p><span className="font-semibold text-white">Platform services:</span> skill programs, event operations, opportunities, internships, and collaboration workflows.</p>
          <p><span className="font-semibold text-white">User responsibilities:</span> provide accurate information, maintain account security, and follow community standards.</p>
          <p><span className="font-semibold text-white">Payments:</span> certain services may be paid; fees are generally non-refundable unless explicitly specified.</p>
          <p><span className="font-semibold text-white">Intellectual property:</span> TechMNHub identity, content, and platform materials remain protected and cannot be used without permission.</p>
          <p><span className="font-semibold text-white">Platform authority:</span> accounts violating rules may be suspended or removed, and product features may evolve over time.</p>
        </div>
      </GlowCard>
    </SectionWrapper>
  </PageScaffold>
)

export default TermsOfUse
