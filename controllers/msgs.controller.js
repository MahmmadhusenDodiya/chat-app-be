import Conversation from "../models/chat.model.js";

export const addMsgToConversation = async (participants, msg) => {
   try {
    console.log("inside add msg to conversation parti="+participants+" || msg="+msg.receiver);
       let conversation = await Conversation.findOne(
                                   { users: { $all: participants } });


       if (!conversation) {
           conversation = await Conversation.create({ users: participants });
       }
         conversation.msgs.push(msg);
         await conversation.save();
   } catch (error) {
       console.log('Error adding message to conversation: ' + error.message);
   }
};

const getMsgsForConversation = async (req, res) => {
    try {
        const { sender, receiver } = req.query;
        console.log("Sender ="+sender);
        console.log("receiver = "+receiver);

        const participants = [sender, receiver];
        
        const conversation = await Conversation.findOne({ users: { $all: participants } });
        if (!conversation) {
            console.log('Conversation not found');
            return res.status(404).send({message:"No Conversation found"});
        }
        return res.json(conversation.msgs); 
    } catch (error) {
        console.log('Error fetching messages:', error);
        res.status(500).json({ error: 'Server error' });
    }
 };
 export default getMsgsForConversation;
 