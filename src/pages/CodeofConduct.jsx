import PageScaffold from '../components/layout/PageScaffold'
import SectionWrapper from '../components/ui/SectionWrapper'
import GlowCard from '../components/ui/GlowCard'

const CodeofConduct = () => (
  <PageScaffold>
    <SectionWrapper title="Code of Conduct" subtitle="A respectful, safe, and ethical community is non-negotiable." maxWidth="max-w-4xl">
      <GlowCard className="p-6" floating={false}>
        <div className="space-y-4 text-sm text-[#A0A0A0]">
          <p><span className="font-semibold text-white">Users must:</span> respect others, follow platform rules, and maintain ethical conduct in all interactions.</p>
          <p><span className="font-semibold text-white">Prohibited behavior:</span> harassment, fraud, cheating, abuse, and misuse of platform services.</p>
          <p><span className="font-semibold text-white">Violation consequences:</span> account suspension, removal from TechMNHub, or permanent access restrictions.</p>
        </div>
      </GlowCard>
    </SectionWrapper>
  </PageScaffold>
)

export default CodeofConduct
