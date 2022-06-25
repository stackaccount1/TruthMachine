# @version >=0.2.0 <0.3.0

Struct Truth:
    who: address
    url: String[100]
    title: String[100]
    truth: bool
    number: uint256

truthid: public(uint256)

voters: HashMap(address, bool)

admin: address

@external
def __init__():
    self.admin = msg.sender
    
@external
@payable
def submitTruth(url: String[100], title: String[100]):
    assert msg.value > .02 ether, "need to pay .02 ether to deposit a truth"
    self.Truth[truthid] = Truth({
        who: msg.sender,
        url: url,
        title: title,
        truth: False,
        number: truthid,
    })
    truthid += 1



