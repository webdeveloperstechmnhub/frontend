import PageScaffold from '../components/layout/PageScaffold'
import SectionWrapper from '../components/ui/SectionWrapper'
import GlowCard from '../components/ui/GlowCard'

const Legal = () => (
  <PageScaffold>
    <SectionWrapper title="Legal Information" subtitle="Accessibility, refunds, and platform disclaimer." maxWidth="max-w-4xl">
      <div className="grid gap-4">
        <GlowCard className="p-6" floating={false}>
          <h2 className="text-xl font-semibold text-white">Accessibility</h2>
          <p className="mt-2 text-sm text-[#A0A0A0]">TechMNHub is committed to equal access, inclusive participation, and non-discriminatory platform experiences for all users.</p>
        </GlowCard>

        <GlowCard className="p-6" floating={false}>
          <h2 className="text-xl font-semibold text-white">Refund Policy</h2>
          <p className="mt-2 text-sm text-[#A0A0A0]">Payments for events and services are generally non-refundable, except when an event is cancelled by TechMNHub or the service is unavailable.</p>
        </GlowCard>

        <GlowCard className="p-6" floating={false}>
          <h2 className="text-xl font-semibold text-white">Platform Disclaimer</h2>
          <p className="mt-2 text-sm text-[#A0A0A0]">TechMNHub provides opportunities, platform access, and skill growth systems. Job or internship outcomes depend on user performance and selection processes.</p>
        </GlowCard>
      </div>
    </SectionWrapper>
  </PageScaffold>
)

export default Legal
