import PageScaffold from '../components/layout/PageScaffold'
import SectionWrapper from '../components/ui/SectionWrapper'
import GlowCard from '../components/ui/GlowCard'

const PrivacyPolicy = () => (
  <PageScaffold>
    <SectionWrapper title="Privacy Policy" subtitle="Effective date: 01 February 2026" maxWidth="max-w-4xl">
      <GlowCard className="space-y-4 p-6" floating={false} hoverScale={1.005}>
        <p className="text-[#A0A0A0]">TechMNHub is a skill development and opportunity platform connecting students, institutions, vendors, and professionals. We are committed to protecting user privacy and personal data.</p>
        <div className="space-y-3 text-sm text-[#A0A0A0]">
          <p><span className="font-semibold text-white">Information we collect:</span> profile details, account activity, participation records, and contact information needed for services.</p>
          <p><span className="font-semibold text-white">Payment safety:</span> payments are handled through third-party processors; TechMNHub does not store card numbers, CVV, or banking passwords.</p>
          <p><span className="font-semibold text-white">Usage purpose:</span> registrations, certifications, event participation, opportunity access, support, and platform improvements.</p>
          <p><span className="font-semibold text-white">Data sharing:</span> we do not sell user data. Limited sharing may happen with institutions, event partners, or legal authorities when required.</p>
          <p><span className="font-semibold text-white">Consent:</span> by using TechMNHub services, you consent to this policy.</p>
          <p><span className="font-semibold text-white">Contact:</span> techmnhub.team@gmail.com | +91 9259586175</p>
        </div>
      </GlowCard>
    </SectionWrapper>
  </PageScaffold>
)

export default PrivacyPolicy
