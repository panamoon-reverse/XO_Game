# วิธี Setup
- clone Project
# วิธี run program
- สามารถเปิดไฟล์ index.html ได้เลย

# การออกแบบโปรแกรม
ใช้ HTML CSS Javascript ในการเขียน function 
บันทึกข้อมูลลงใน memory ของ browser ในการบันทึก gameHistory

# Algorithm ที่ใช้ 
1. รับค่า boardSize จากผู้เล่น กำหนดให้ขนาดของตาราง >= 3 และ <=10 (alert warning)
2. รับ mode การเล่นจากผู้เล่น
3. นำค่าขนาดตาารางมาแสดงผลเป็นตารางเกม
4. โหมดการเล่นเป็นเงื่อนไขการทำงาน โดยที่
- 2 Players จะรับตำแหน่งจากผู้เล่น X และผู้เล่น O สลับกัน
- AI จะรับตำแหน่งจากผู้เล่น X และเรียกใช้ makeAIMove() โดยที่ AI เป็นผู้เล่น O
5. กำหนดให้ผู้เล่น X เป็นฝ่ายเริ่มเกมก่อนเสมอ
6. ตรวจสอบเงื่อนไขการชนะ คือ ต้องเรียงสัญลักณ์ให้ได้ตามค่า boardSize ในแนวตั้ง แนวนอน แนวทแยงซ้าย แนวทแยงขวา
- if มีฝ่ายชนะ และ gameResult = Draw ให้ gameOver = true แล้วจบเกม
- else (เกมยังไม่จบ) ให้เริ่ม turn ของผู้เล่นคนถัดไป (ผู้เล่น O หรือ AI)
7. AI จะตรวจสอบว่ามีช่องไหนที่สามารถทำสัญลักณ์ได้บ้าง แล้วใช้ random()
8. มีการกำหนดให้บันทึกผลเกม แสดงเกมที่บันทึกไว้ แล้วสามารถ replay เกมที่เลือกได้

  *หลักการการทำงานของ AI*
  - Random เลือกสุ่มจากตำแหน่งของ availableMove ซึ่งเป็นเพียงวิธรการสุ่มเอา ไม่ก่อให้เกิดการเอาชนะ หรือ บล็อคทางอีกฝ่ายได้

แนวทางอื่นๆ
  - แบบวางเงื่อนไขกลยุทธ์ ทำสัญลักษณ์ลงในช่องมุม บนซ้าย บนขวา ล่างซ้าย ล่างขวา และกลางตารางเพื่อบล็อคทางฝ่ายตรงข้าม
  - Minimax เป็นการหา bestMove โดยนับคะแนนเส้นทางที่เป็นไปได้และออกมาดีที่สุด 
