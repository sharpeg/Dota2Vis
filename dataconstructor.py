import sys
import time
from operator import itemgetter

fileinput = "data.csv"
fileinput = open(fileinput,"r")
contentbyline = fileinput.readlines()
INDICES = ["Winner","Team 1 faction","Team 1 Pick Order","Team 1 Pick 1","Team 1 Pick 2","Team 1 Pick 3","Team 1 Pick 4","Team 1 Pick 5","Team 1 Name","Team 2 Name","Team 2 Pick 1","Team 2 Pick 2","Team 2 Pick 3","Team 2 Pick 4","Team 2 Pick 5","Team 2 faction","Team 2 Pick Order","Stage"]

HERO_LIST = ["Zeus","Wraith King","Witch Doctor","Winter Wyvern","Windranger","Weaver","Warlock","Visage","Viper","Venomancer","Vengeful Spirit","Ursa","Undying","Underlord","Tusk","Troll Warlord","Treant Protector","Tiny","Tinker","Timbersaw","Tidehunter","Terrorblade","Templar Assassin","Sven","Storm Spirit","Spirit Breaker","Spectre","Sniper","Slark","Slardar","Skywrath Mage","Silencer","Shadow Shaman","Shadow Fiend","Shadow Demon","Sand King","Rubick","Riki","Razor","Queen of Pain","Pugna","Pudge","Puck","Phoenix","Phantom Lancer","Phantom Assassin","Outworld Devourer","Oracle","Omniknight","Ogre Magi","Nyx Assassin","Night Stalker","Necrophos","Nature's Prophet","Naga Siren","Morphling","Monkey King","Mirana","Meepo","Medusa","Magnus","Lycan","Luna","Lone Druid","Lion","Lina","Lifestealer","Lich","Leshrac","Legion Commander","Kunkka","Keeper of the Light","Juggernaut","Jakiro","Io","Invoker","Huskar","Gyrocopter","Faceless Void","Enigma","Enchantress","Ember Spirit","Elder Titan","Earthshaker","Earth Spirit","Drow Ranger","Dragon Knight","Doom","Disruptor","Death Prophet","Dazzle","Dark Seer","Crystal Maiden","Clockwerk","Clinkz","Chen","Chaos Knight","Centaur Warrunner","Broodmother","Bristleback","Brewmaster","Bounty Hunter","Bloodseeker","Beastmaster","Batrider","Bane","Axe","Arc Warden","Anti-Mage","Ancient Apparition","Alchemist","Abaddon"]
ATTRIBUTE_INT_LIST = ["Zeus","Witch Doctor","Winter Wyvern","Windranger","Warlock","Visage","Tinker","Storm Spirit","Skywrath Mage","Silencer","Shadow Shaman","Shadow Demon","Rubick","Queen of Pain","Pugna","Puck","Outworld Devourer","Oracle","Ogre Magi","Necrophos","Nature's Prophet","Lion","Lina","Lich","Leshrac","Keeper of the Light","Jakiro","Invoker","Enigma","Enchantress","Disruptor","Death Prophet","Dazzle","Dark Seer","Crystal Maiden","Chen","Batrider","Bane","Ancient Apparition"]
ATTRIBUTE_STR_LIST = ['Wraith King','Undying', 'Underlord', 'Tusk', 'Treant Protector', 'Tiny', 'Timbersaw', 'Tidehunter', 'Sven', 'Spirit Breaker', 'Sniper', 'Slardar', 'Sand King', 'Pudge', 'Phoenix', 'Omniknight', 'Night Stalker','Magnus', 'Lycan','Lifestealer', 'Legion Commander', 'Kunkka', 'Io', 'Huskar', 'Elder Titan', 'Earthshaker', 'Earth Spirit', 'Dragon Knight', 'Doom', 'Clockwerk','Chaos Knight', 'Centaur Warrunner','Bristleback', 'Brewmaster','Beastmaster', 'Axe', 'Arc Warden','Alchemist', 'Abaddon']
ATTRIBUTE_AGI_LIST = ['Weaver', 'Viper', 'Venomancer', 'Vengeful Spirit', 'Ursa', 'Troll Warlord', 'Terrorblade', 'Templar Assassin', 'Spectre', 'Slark', 'Shadow Fiend', 'Riki', 'Razor', 'Phantom Lancer', 'Phantom Assassin', 'Nyx Assassin', 'Naga Siren', 'Morphling', 'Monkey King', 'Mirana', 'Meepo', 'Medusa', 'Luna', 'Lone Druid', 'Juggernaut', 'Gyrocopter', 'Faceless Void', 'Ember Spirit', 'Drow Ranger', 'Clinkz', 'Broodmother', 'Bounty Hunter', 'Bloodseeker', 'Anti-Mage']

# Roles sourced from http://dota2.gamepedia.com/Role
ROLE_NAMES = ["Carry","Disabler","Initiator","Jungler","Support","Durable","Nuker","Pusher","Escape"]
ROLE_CARRY_LIST = ["Wraith King","Tiny","Sven","Spirit Breaker","Slardar","Night Stalker","Lycan","Lifestealer","Legion Commander","Kunkka","Huskar","Dragon Knight","Doom","Chaos Knight","Bristleback","Brewmaster","Alchemist","Abaddon","Weaver","Viper","Ursa","Troll Warlord","Terrorblade","Templar Assassin","Spectre","Sniper","Slark","Shadow Fiend","Riki","Razor","Phantom Lancer","Phantom Assassin","Naga Siren","Morphling","Monkey King","Mirana","Meepo","Medusa","Luna","Lone Druid","Juggernaut","Gyrocopter","Faceless Void","Ember Spirit","Drow Ranger","Clinkz","Broodmother","Bloodseeker","Arc Warden","Anti-Mage","Windranger","Tinker","Storm Spirit","Silencer","Queen of Pain","Outworld Devourer","Necrophos","Nature's Prophet","Lina","Leshrac","Invoker","Death Prophet"]
ROLE_DISABLER_LIST = ["Wraith King","Undying","Underlord","Tusk","Treant Protector","Tiny","Tidehunter","Sven","Spirit Breaker","Slardar","Sand King","Pudge","Phoenix","Night Stalker","Magnus","Lifestealer","Legion Commander","Kunkka","Elder Titan","Earthshaker","Earth Spirit","Dragon Knight","Doom","Clockwerk","Chaos Knight","Centaur Warrunner","Brewmaster","Beastmaster","Axe","Alchemist","Viper","Venomancer","Vengeful Spirit","Ursa","Troll Warlord","Slark","Riki","Nyx Assassin","Naga Siren","Morphling","Monkey King","Mirana","Meepo","Medusa","Gyrocopter","Faceless Void","Ember Spirit","Drow Ranger","Bloodseeker","Witch Doctor","Winter Wyvern","Windranger","Warlock","Visage","Techies","Storm Spirit","Skywrath Mage","Silencer","Shadow Shaman","Shadow Demon","Rubick","Puck","Outworld Devourer","Oracle","Ogre Magi","Necrophos","Lion","Lina","Leshrac","Keeper of the Light","Jakiro","Invoker","Enigma","Enchantress","Disruptor","Death Prophet","Dazzle","Dark Seer","Crystal Maiden","Batrider","Bane","Ancient Apparition"]
ROLE_INITIATOR_LIST = ["Wraith King","Tusk","Treant Protector","Tiny","Tidehunter","Sven","Spirit Breaker","Slardar","Sand King","Pudge","Phoenix","Night Stalker","Magnus","Legion Commander","Kunkka","Huskar","Elder Titan","Earthshaker","Earth Spirit","Dragon Knight","Doom","Clockwerk","Chaos Knight","Centaur Warrunner","Bristleback","Brewmaster","Beastmaster","Axe","Alchemist","Viper","Venomancer","Vengeful Spirit","Nyx Assassin","Naga Siren","Monkey King","Meepo","Faceless Void","Ember Spirit","Bloodseeker","Warlock","Storm Spirit","Silencer","Shadow Shaman","Shadow Demon","Puck","Ogre Magi","Lion","Enigma","Disruptor","Dark Seer","Batrider"]
ROLE_JUNGLER_LIST = ["Sand King","Lycan","Lifestealer","Axe","Ursa","Lone Druid","Bloodseeker","Nature's Prophet","Keeper of the Light","Enigma","Enchantress","Dark Seer","Crystal Maiden","Chen","Batrider"]
ROLE_SUPPORT_LIST = ["Wraith King","Undying","Underlord","Treant Protector","Phoenix","Omniknight","Io","Earthshaker","Alchemist","Abaddon","Venomancer","Vengeful Spirit","Naga Siren","Mirana","Witch Doctor","Winter Wyvern","Windranger","Warlock","Visage","Skywrath Mage","Silencer","Shadow Shaman","Shadow Demon","Rubick","Oracle","Ogre Magi","Lion","Lina","Lich","Leshrac","Keeper of the Light","Jakiro","Enchantress","Disruptor","Dazzle","Crystal Maiden","Chen","Bane","Ancient Apparition"]
ROLE_DURABLE_LIST = ["Wraith King","Undying","Underlord","Treant Protector","Tiny","Timbersaw","Tidehunter","Sven","Spirit Breaker","Slardar","Pudge","Omniknight","Night Stalker","Lycan","Lifestealer","Legion Commander","Kunkka","Huskar","Elder Titan","Earth Spirit","Dragon Knight","Doom","Clockwerk","Chaos Knight","Centaur Warrunner","Bristleback","Brewmaster","Beastmaster","Axe","Alchemist","Abaddon","Viper","Ursa","Troll Warlord","Spectre","Razor","Morphling","Medusa","Lone Druid","Faceless Void","Visage","Ogre Magi","Necrophos","Enchantress","Bane"]
ROLE_NUKER_LIST = ["Undying","Underlord","Tusk","Tiny","Timbersaw","Tidehunter","Sven","Sand King","Pudge","Phoenix","Omniknight","Night Stalker","Magnus","Legion Commander","Kunkka","Io","Elder Titan","Earthshaker","Earth Spirit","Dragon Knight","Doom","Clockwerk","Centaur Warrunner","Bristleback","Brewmaster","Beastmaster","Alchemist","Venomancer","Vengeful Spirit","Terrorblade","Sniper","Slark","Shadow Fiend","Razor","Phantom Lancer","Nyx Assassin","Morphling","Mirana","Meepo","Luna","Gyrocopter","Ember Spirit","Broodmother","Bounty Hunter","Bloodseeker","Arc Warden","Anti-Mage","Zeus","Witch Doctor","Winter Wyvern","Windranger","Visage","Tinker","Techies","Storm Spirit","Skywrath Mage","Silencer","Shadow Shaman","Shadow Demon","Rubick","Queen of Pain","Pugna","Puck","Outworld Devourer","Oracle","Ogre Magi","Necrophos","Nature's Prophet","Lion","Lina","Lich","Leshrac","Keeper of the Light","Jakiro","Invoker","Disruptor","Death Prophet","Dazzle","Crystal Maiden","Bane","Ancient Apparition"]
ROLE_PUSHER_LIST = ["Tiny","Lycan","Dragon Knight","Chaos Knight","Venomancer","Troll Warlord","Terrorblade","Razor","Phantom Lancer","Naga Siren","Meepo","Luna","Lone Druid","Juggernaut","Drow Ranger","Clinkz","Broodmother","Visage","Tinker","Shadow Shaman","Pugna","Nature's Prophet","Leshrac","Jakiro","Invoker","Enigma","Enchantress","Death Prophet","Chen"]
ROLE_ESCAPE_LIST = ["Underlord","Treant Protector","Timbersaw","Spirit Breaker","Slardar","Sand King","Phoenix","Magnus","Lycan","Lifestealer","Io","Earth Spirit","Centaur Warrunner","Weaver","Vengeful Spirit","Templar Assassin","Spectre","Slark","Riki","Phantom Lancer","Phantom Assassin","Nyx Assassin","Naga Siren","Morphling","Monkey King","Mirana","Meepo","Juggernaut","Faceless Void","Ember Spirit","Clinkz","Broodmother","Bounty Hunter","Arc Warden","Anti-Mage","Windranger","Storm Spirit","Queen of Pain","Puck","Oracle","Nature's Prophet","Invoker","Dark Seer","Batrider"]
FACTION_LIST = ["Radiant","Dire"]
TOURNAMENT_LIST = ["Kiev Major","Boston Major","The International 2016"]
PICK_LIST = ["1","2-3","4","5","6","7","8","9","10"]
OUTCOME_LIST = ["W","L"]
TEAM_LIST = []

DATA_TABLES = []

# For each hero in a game in the csv, add its data to the DATA_TABLES
def buildDataTable(contentbyline):
	for hero in HERO_LIST:
		DATA_TABLES.append([])

	for i in range(1,len(contentbyline)):
		contentbyline[i]=contentbyline[i].split(",")
		line=contentbyline[i]
		
		if "Radiant" in line:
			if line[INDICES.index("Winner")]=="1":
				outcome1="W"
				outcome2="L"
			else:
				outcome2="W"
				outcome1="L"

			if line[INDICES.index("Team 1 Pick Order")]=="1st Pick":
				team1PICK_LIST=["1","4","6","8","9"]
				team2PICK_LIST=["2-3","2-3","5","7","10"]
			else:
				team2PICK_LIST=["1","4","6","8","9"]
				team1PICK_LIST=["2-3","2-3","5","7","10"]

			tournament = line[INDICES.index("Stage")].strip("\n")
			tournament = tournament.strip("\n")
			tournament = tournament.strip("\r")

			faction = line[INDICES.index("Team 1 faction")]
			team = line[INDICES.index("Team 1 Name")]
			for pickNum in range(5):
				hero = line[INDICES.index("Team 1 Pick "+str(pickNum+1))]
				pick = team1PICK_LIST[pickNum]
				appendToTable(hero,faction,tournament,pick,team,outcome1)
				

			faction = line[INDICES.index("Team 2 faction")]
			team = line[INDICES.index("Team 2 Name")]
			for pickNum in range(5):
				hero = line[INDICES.index("Team 2 Pick "+str(pickNum+1))]	
				pick = team2PICK_LIST[pickNum]
				appendToTable(hero,faction,tournament,pick,team,outcome2)

def appendToTable(hero,faction,tournament,pick,team,outcome):
	DATA_TABLES[HERO_LIST.index(hero)].append([faction,tournament,pick,team,outcome])
	if team not in TEAM_LIST:
		TEAM_LIST.append(team)

def getOutcomeDictFromTable(hero,faction,tournament,pick,team,outcome):
	wins,losses=0,0
	for row in DATA_TABLES[HERO_LIST.index(hero)]:
		useThisRow = True
		if faction:
			if faction != row[0]:
				useThisRow = False
		if tournament:
			if tournament != row[1]:
				useThisRow = False
		if pick:
			if pick != row[2]:
				useThisRow = False
		if team:
			if team != row[3]:
				useThisRow = False
		if outcome:
			if outcome != row[4]:
				useThisRow = False
		if useThisRow:
			if row[4]=="W":
				wins += 1
			else:
				losses += 1
	return {"W":wins,"L":losses}

def computeWinrate(outcomedict):
	if outcomedict["W"]+outcomedict["L"] > 0:
		return outcomedict["W"]/(outcomedict["W"]+outcomedict["L"]+0.0)
	return None

def getHeroPickDictFromTable(hero,faction,tournament,pick,team,outcome):
	wins,losses=0,0
	totalwins,totallosses=0,0
	useThisTable = False
	heroIndex = HERO_LIST.index(hero)
	for i in range(len(HERO_LIST)):
		if heroIndex==i:
			useThisTable = True
		else:
			useThisTable = False
		for row in DATA_TABLES[i]:
			useThisRow = True
			if faction:
				if faction != row[0]:
					useThisRow = False
			if tournament:
				if tournament != row[1]:
					useThisRow = False
			if pick:
				if pick != row[2]:
					useThisRow = False
			if team:
				if team != row[3]:
					useThisRow = False
			if outcome:
				if outcome != row[4]:
					useThisRow = False
			if useThisRow:
				if row[4]=="W":
					totalwins += 1
					if useThisTable:
						wins += 1
				else:
					totallosses += 1
					if useThisTable:
						losses += 1
	return {hero:{"W":wins,"L":losses},"Total":{"W":totalwins,"L":totallosses}}

def getFactionDictFromTable(hero,faction,tournament,pick,team,outcome):
	radiant,dire=0,0
	for row in DATA_TABLES[HERO_LIST.index(hero)]:
		useThisRow = True
		if faction:
			if faction != row[0]:
				useThisRow = False
		if tournament:
			if tournament != row[1]:
				useThisRow = False
		if pick:
			if pick != row[2]:
				useThisRow = False
		if team:
			if team != row[3]:
				useThisRow = False
		if outcome:
			if outcome != row[4]:
				useThisRow = False
		if useThisRow:
			if row[0]=="Radiant":
				radiant += 1
			else:
				dire += 1
	return {"Radiant":radiant,"Dire":dire}

def getAvgTimePickedFromTable(hero,faction,tournament,pick,team,outcome):
	total,num=0.0,0.0
	for row in DATA_TABLES[HERO_LIST.index(hero)]:
		useThisRow = True
		if faction:
			if faction != row[0]:
				useThisRow = False
		if tournament:
			if tournament != row[1]:
				useThisRow = False
		if pick:
			if pick != row[2]:
				useThisRow = False
		if team:
			if team != row[3]:
				useThisRow = False
		if outcome:
			if outcome != row[4]:
				useThisRow = False
		if useThisRow:
			if row[2]=="2-3":
				total += 2.5
			else:
				total += int(row[2])
			num += 1
	if num > 0:
		return total/num+.000001
	else:
		return None

def main():
	buildDataTable(contentbyline)

	time3 = time.time()
	newlist = []
	for hero in HERO_LIST:
		#print getFactionDictFromTable(hero,None,None,None,"OG",None), hero
		#print hero,",",getAvgTimePickedFromTable(hero,None,"Kiev Major",None,None,None),",",computeWinrate(getOutcomeDictFromTable(hero,None,"Kiev Major",None,None,None))
		if hero not in ATTRIBUTE_INT_LIST and hero not in ATTRIBUTE_STR_LIST:
			newlist.append(hero)
	# print time.time()-time3
	print newlist
main()