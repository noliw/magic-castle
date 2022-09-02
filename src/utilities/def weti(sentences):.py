def weti(sentences):
    spaces=0
    for i in range (len(sentences)):
        if sentences[i] == " ":
                spaces= spaces+1
    return spaces


print(weti(["alice and bob love leetcode i think so too this is great thanks very much"]))