module.exports = class {
  constructor(messageModel, chatModel) {
    this.messageModel = messageModel;
    this.chatModel = chatModel;
  };
  get(req,res,next) {
    this.messageModel.findOne({
      message: req.params.id
    })
    .exec((err, message) => {
      if(err) {
        next(err);
      } else {
        res.json(message);
      }
    });
  };
  send(req,res,next) {
    var newMessage = new Message ({
      senderUserID: req.body.sendUserId,
      receiverUserID: req.body.receiveUserId,
      message: req.body.textMessage
    });
    newMessage.save((err, message) => {
      if(err) {
          next(err)
        } else {
          res.send(message);
        }
    });
  };
  messageHistory (req, res, next){
    this.chatModel.collection.findOne({participants: {$all: [req.body.sender, req.body.receiver]}}, (err, chat) => {
      if(err) {
        next(err);
      } else {
        this.messageModel.find({chatID: chat._id}, (err, message) => {
          if(err) {
            next(err);
          } else {
            res.json(message);
          }
        });
      }
    });
  }
}
