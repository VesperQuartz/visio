import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DescriptionDisplayProps {
  description: string
}

export default function DescriptionDisplay({ description }: DescriptionDisplayProps) {
  return (
    <Card className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Image Description</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg">{description}</p>
      </CardContent>
    </Card>
  )
}

