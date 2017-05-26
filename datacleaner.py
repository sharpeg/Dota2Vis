import sys

fileinput = "internationaldata.txt"
fileinput = open(fileinput,"r")
contentbyline = fileinput.readlines()
heroinput = "herolist.txt"
heroinput = open(heroinput,"r")
herolist = heroinput.readlines()
for i in range(len(herolist)):
	herolist[i] = herolist[i].replace("\n","").strip()

for line in contentbyline:
	line2=line
	for hero in herolist:
#		line2=line2.replace(" "+hero,hero)
#		line2=line2.replace(" "+hero,hero)
#		line2=line2.replace(" "+hero,hero)
#		line2=line2.replace(hero+" ",hero)
#		line2=line2.replace(hero+" ",hero)
#		line2=line2.replace(hero+" ",hero)
#		line2=line2.replace(hero+"\t",hero)
#		line2=line2.replace(hero+"\t",hero)
		line2=line2.replace(hero,","+hero+",")
	line2=line2.replace(",,",",")
	print line2