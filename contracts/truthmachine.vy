# @version >=0.2.0

struct Truth:
    who: address
    url: String[100]
    title: String[100]
    truth: bool
    votes: uint256

truthList: HashMap[uint256, Truth]

truthCount: public(uint256)

votercount: public(uint256)

voters: HashMap[address, bool]

admin: address

@external
def __init__():
    self.admin = msg.sender
    self.truthCount = 1

@external
@payable
def submitTruth(_url: String[100], _title: String[100]):
    newTruth: Truth = Truth({
        who: msg.sender,
        url: _url,
        title: _title,
        truth: False,
        votes: 0,
    })
    self.truthList[self.truthCount] = newTruth
    self.truthCount += 1

