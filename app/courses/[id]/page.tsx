export default function CourseDetailPage({ params }: { params: { id: string } }) {
    return (
        <main>
            課程詳情頁 {params.id}
        </main>
    )
}