# @version >=0.2.0
event Title:
    value: String[100]

struct Truth:
    who: address
    url: String[100]
    title: String[100]
    truth: bool
    votes: uint256

voter: public(address)

admin: address

truthCount: public(uint256)
voterCount: public(uint256)

voterList: HashMap[uint256, address]
voterBool: HashMap[address, bool]
truthList: HashMap[uint256, Truth]

proposalRecord: HashMap[address, HashMap[uint256, bool]]


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

@external
def mintVoters(proleteriataddress: address):
    assert msg.sender == self.admin
    self.voterList[self.voterCount] = proleteriataddress
    self.voterCount += 1
    self.voterBool[proleteriataddress] = True

#true or false
@external
def voteTruth(proposedtruthid: uint256, torf: bool):
    assert self.voterBool[msg.sender] == True, "not a registered voter"
    #cant vote twice
    assert not self.proposalRecord[msg.sender][proposedtruthid] == True
    if (torf == True):
        self.truthList[proposedtruthid].votes += 1
    self.proposalRecord[msg.sender][proposedtruthid] = True

@internal
def _tallyVotesVerifyTruth(_proposedtruthid: uint256):
    x: uint256 = self.voterCount / 2
    if (self.truthList[_proposedtruthid].votes > x):
        self.truthList[_proposedtruthid].truth = True


@external
def tallyVotesVerifyTruth(proposedtruthid: uint256):
    self._tallyVotesVerifyTruth(proposedtruthid)

#check votes
@view
@external
def returnvotes(proposedtruthid: uint256) -> uint256:
    return self.truthList[proposedtruthid].votes

#check truth of proposal
@view
@external
def viewTruth(proposedtruthid: uint256) -> bool:
    return self.truthList[proposedtruthid].truth

#look at proposals title
@view
@external
def viewTitle(proposedtruthid: uint256) -> String[100]:
    log Title(self.truthList[proposedtruthid].title)
    return self.truthList[proposedtruthid].title
