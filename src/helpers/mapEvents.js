import moment from "moment";

export const mapEvents = (events) => {

    return events.map((evento) => {
        return {
            ...evento,
            start: moment(evento.start).toDate(),
            end: moment(evento.end).toDate(),
        }
    })
}

export const mapEvent = (event) => {
    return {
        ...event,
        start: moment(event.start).toDate(),
        end: moment(event.end).toDate(),
    }
}