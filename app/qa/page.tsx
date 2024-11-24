import QAAssistant from '../../components/QAAssistant'

export default function QAPage() {
    return (
        <div className="space-y-6 p-10">
            <h1 className="text-4xl font-bold text-center text-blue-100 animate-pulse">Q&A</h1>
            <QAAssistant />
        </div>
    )
}