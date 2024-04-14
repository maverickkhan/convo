import { useEffect, useMemo, useState } from "react"
import { createId } from '@paralleldrive/cuid2'
import { updateData, fetchData, deleteData } from "../helpers/database"
import { AddForm } from "./container/AddForm"
import { DeleteDialog } from "./container/DeleteDialog"
import { Table } from "./container/Table"
import { ViewDialog } from "./container/ViewDialog"

export interface Data {
  id: string
  title: string
  upvotes: number
  date: string
}

function App() {
  const [data, setData] = useState<Data[]>([])

  useEffect(() => {
    fetchData().then(e => setData(e)).catch(_ => console.log(`error setting data`))
  }, [])

  const [selected, setSelected] = useState<{ id?: string; reason?: "Delete" | "View" | "Edit" } | undefined>(undefined)

  const selectedData = useMemo(() => (selected ? data.find((row) => row.id === selected.id) : undefined), [selected])

  return (
    <>
      <div className="p-6">
        <div className="-m-6 flex min-h-screen flex-wrap">
          <div className="w-full self-center p-6 md:w-4/12">
            <AddForm
              defaultValues={selected?.reason === "Edit" ? selectedData : undefined}
              onSubmit={async (row) => {
                let newData: Data[] = []
                if (row.id) newData = data.map((data) => (data.id === row.id ? row : data))
                else newData = [...data, { ...row, id: createId() }]
                updateData(newData)
                setData(newData)
              }}
            />
          </div>
          <div className="w-full space-y-4 p-6 md:w-8/12">
            <Table
              onDelete={(row) => setSelected({ id: row.id, reason: "Delete" })}
              onView={(row) => setSelected({ id: row.id, reason: "View" })}
              onEdit={(row) => setSelected({ id: row.id, reason: "Edit" })}
              data={data}
            />
          </div>
        </div>
      </div>
      <ViewDialog open={selected?.reason === "View"} onClose={() => setSelected(undefined)} data={selectedData} />
      <DeleteDialog
        open={selected?.reason === "Delete"}
        onClose={() => setSelected(undefined)}
        onConfirm={() => {
          const newData = data.filter((data) => data.id !== selected?.id)
          setData(newData)
          deleteData(selected?.id!)
          setSelected(undefined)
        }}
        data={selectedData}
      />
    </>
  )
}

export default App
