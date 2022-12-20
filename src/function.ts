import { Request, Response } from "express";
import fs from "fs"
type note = {
    id: number,
    name: string,
    image: string,
    text: string,
    likes: number,
    comments: number
}
type State = {
    ids: number
    notes: note[]
}
let Notes: note[] = []
let id = 0
export function getMethod(req: Request, res: Response) {
    res.status(200).json({ message: "All Notes", Notes })
}
export function postMethod(req: Request, res: Response) {
    id++
    const body = req.body
    body["id"] = id
    Notes.push(body)
    res.status(200).json({ message: "Note added!" })
    save()
}

export function deleteMethod(req: Request, res: Response) {
    const id = +req.params.id
    Notes = Notes.filter(note => note.id !== id)
    res.status(200).json({ message: "Deleted note!" })
    save()
}
export function load() {
    if (fs.existsSync("./saved")) {
        const json: string = fs.readFileSync("./saved", "utf-8")
        const state: State = JSON.parse(json)
        id = state.ids
        Notes = state.notes
    } else {
        save()
    }
}
function save() {
    const state: State = {
        ids: id,
        notes: Notes
    }
    const json = JSON.stringify(state)
    fs.writeFileSync("./saved", json)
}
