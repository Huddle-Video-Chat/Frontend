import sys
import os

folder_path = "/Users/zgong/sum2020/Backend/backend-new/"
file_name = "gettingstarted/settings.py"

reading_file = open(folder_path + file_name, "r")

new_file_content = ""
for line in reading_file:
  stripped_line = line.strip()
  if ("ALBERT_WHITELIST=" in stripped_line):
    new_line = "ALBERT_WHITELIST=\"" + sys.argv[1] + "\""
  else:
    new_line = stripped_line
  new_file_content += new_line +"\n"
reading_file.close()

writing_file = open(folder_path + file_name, "w")
writing_file.write(new_file_content)
writing_file.close()

os.chdir(folder_path)
os.system('git add .')
os.system('git commit -m \"wl albert\"')
os.system('git push heroku master')

