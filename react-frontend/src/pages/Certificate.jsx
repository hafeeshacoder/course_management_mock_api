import PageShell from "../components/PageShell";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function Certificate() {
    return (
        <>
            <PageCss href="/css/certificate.css" />
            <PageShell variant="cert">
            <section className="certificate-section">
                <div className="certificate-wrap">
                    <canvas id="certificateCanvas" width="1200" height="850"></canvas>
                </div>
                <div className="certificate-actions">
                    <button id="downloadBtn" className="btn download-btn">Download Certificate</button>
                    <button id="printBtn" className="btn print-btn">Print</button>
                    <button id="backBtn" className="btn back-btn">Back to My Courses</button>
                </div>
            </section>
            </PageShell>
            <LegacyScript src="/legacy/js/certificate.js" />
        </>
    );
}
