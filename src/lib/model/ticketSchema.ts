import { Schema, model, models } from 'mongoose';

const ticketSchema = new Schema({
    id: { type: String, unique: true, required: true },
    originalTicketList: {
        currentTickets: [String], 
        newTickets: [String], 
        holdTickets: [String], 
        qaTickets: [String], 
      },
    modifiedTicketList: {
        currentTickets:  [String],
        newTickets:  [String],
        holdTickets:  [String],
        qaTickets:  [String]}
    ,
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

export const Ticket = models.Ticket || model('Ticket', ticketSchema);
