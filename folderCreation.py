from bs4 import BeautifulSoup
from urllib.request import urlopen
import string

url = "https://fullstackopen.com/en/part5"
page = urlopen(url)
html = page.read().decode("utf-8")
soup = BeautifulSoup(html, "html.parser")

aTags = soup.find_all("a", class_="arrow__wrapper--stacked")

siteRoot = "https://fullstackopen.com"
sectionToReplaceInHREF = url.replace(siteRoot, "") + "/"
for i in range(len(aTags)):
    href = aTags[i]['href']
    fileName = string.ascii_lowercase[i] + ' ' + href.replace(sectionToReplaceInHREF,'').replace('_', ' ') + '.md'
    text = aTags[i].find('p').text[2:]

    file = open(fileName, "w")
    file.write(f"# [{text}]({siteRoot + href})")
    file.close


