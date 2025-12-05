package com.example.demo;
import org.springframework.boot.ApplicationArguments; 
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import com.example.demo.meme.MemeData;
import com.example.demo.meme.MemeDataRepository;

@Component
public class MemeDataInitializer implements ApplicationRunner {
    private final MemeDataRepository memeDataRepository;

    public MemeDataInitializer(MemeDataRepository memeDataRepository) {
        this.memeDataRepository = memeDataRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception{
        if(memeDataRepository.count() == 0){
            MemeData meme2022_M1 = new MemeData(
                "2022",
                "중요한 것은 꺾이지 않는 마음",
                "What matters is an unbroken spirit",
                "\"중요한 것은 꺾이지 않는 마음\"이라는 밈은 2022년 e스포츠 리그 오브 레전드 월드 챔피언십(롤드컵)에서 탄생했습니다. 당시 약체로 평가받던 DRX 팀의 주장 '데프트' 김혁규 선수가 조별 리그 패배 후 진행된 인터뷰에서 \"저희끼리만 안 무너지면 충분히 이길 수 있을 것 같다\"고 말했는데, 이 발언을 문대찬 기자가 영상 제목으로 요약하는 과정에서 \"중요한 건 꺾이지 않는 마음\"이라는 문구가 탄생하게 되었습니다. 최약체였던 DRX가 모두의 예상을 깨고 최종적으로 롤드컵 우승을 차지하는 '기적의 드라마'를 쓰면서, 이 문구는 역경 속에서도 포기하지 않고 목표를 이루어낸 불굴의 의지를 상징하는 명언이자 국민적인 밈으로 폭발적인 인기를 얻게 되었습니다.",
                "This meme originated in the 2022 League of Legends World Championship, or Worlds, from an interview with Deft, the captain of the DRX team. After a group stage loss, Deft was asked about his team's determination. His original statement was, \"Even though we lost today, I believe we can win if we don't fall apart amongst ourselves.\" A journalist summarized this sentiment in the video title as, \"The most important thing is an unwavering mind/spirit.\" The phrase quickly became famous because DRX, who were considered heavy underdogs, went on a miraculous run and eventually won the entire championship. Thus, the meme is now widely used as a symbol of perseverance and having an indomitable will against all odds.",
                "역경 속에서도 포기하지 않고 목표를 이루어낸 불굴의 의지를 상징한다",
                "It is used as a motto that symbolizes the indomitable will to achieve a goal without giving up, even in the face of adversity",
                "\"지금 우리가 0:2로 지고 있지만, 중요한 것은 꺾이지 않는 마음이다! 포기하지 말고 한 골씩 따라가자!\"",
                "We're down 0-2 right now, but what matters is an unbroken spirit! Let's not give up and catch up, one goal at a time!",
                "./MemePicture/meme2022_M1.png"
            );
            MemeData meme2022_M2 = new MemeData(
                "2022",
                "Young한데? 완전 MZ인데요?",
                "So Young! Very MZ Generation, aren't they?",
                "아바타싱어의 2화 중, 아바타 싱어로 참가한 '클라우디'가 힙하게 등장했는데, 이를 본 립제이가 \\\"Young한데? 완전 MZ인데요?\\\"라는 표현을 사용한 것에서 유래되었다.",
                "The phrase originated from the second episode of the South Korean program, Avatar Singer. When 'Cloudy,' an avatar singer, made a 'hip' entrance, judge Lip J responded with the expression, \"It's Young? They are totally MZ Generation!",
                "보통 기성세대들이 젊은세대들의 예의없는 행동을 비꼬는 의미로 사용된다.",
                "This is generally used by the older generation to satirize or criticize the perceived lack of manners or impolite behavior of the younger generation.",
                "\"요즘 친구들은 인사가 참 '쿨'하네. 'MZ식 인사법'인가? 하하.\"",
                "Young people these days have such an 'MZ' way of greeting, don't they?",
                "./MemePicture/meme2022_M2.png"
            );
            MemeData meme2022_M3 = new MemeData(
                "2022",
                "OO하면 그만이야~",
                "I can just [do OO] and that's it.",
                "2022년 초 주식과 암호화폐 시장이 폭락했을 때, 한 커뮤니티 유저가 \"응 폭락 더 해봐 ㅋㅋㅋㅋ 자살하면 그만이야 ㅋㅋㅋㅋ\"라는 글과 함께 해맑게 웃는 광대 이미지를 올린 것에서 시작되었습니다.",
                "The meme originated in early 2022 when the stock and cryptocurrency markets crashed. A user posted on an online community, \"Go ahead and crash more, I can just kill myself and it'll all be over,\" alongside an image of a brightly smiling clown.",
                "극도의 체념 또는 다크 유머를 나타냅니다. 더 이상 상황이 나빠져도 신경 쓰지 않겠다는 \"배수진\"의 의미로, 파국적인 마지막 수단(OO)을 농담처럼 던지며 정신적인 인지 부조화를 통해 현실을 회피하는 방식입니다.",
                "It signifies extreme resignation or dark humor. It's used to show a \"nothing left to lose\" attitude, often by jokingly suggesting a drastic or self-destructive final measure (OO) to cope with a catastrophic situation.",
                "응, 면접에서 나 떨어뜨려봐, 백수하면 그만이야!",
                "Go ahead and reject me at the interview. I can just be unemployed and that's it!",
                "./MemePicture/meme2022_M3.png"
            );

            MemeData meme2022_M4 = new MemeData(
                "2022",
                "뉴진스의 하입보이요",
                "It's NewJeans' Hype Boy.",
                "2022년 후반, 온라인 콘텐츠에서 시작되어 인스타그램 릴스와 유튜브 쇼츠 등에서 유행했습니다. 길거리에서 인터뷰어(혹은 카메라를 든 사람)가 뜬금없는 질문을 던지면, 상대방이 \"뉴진스의 하입보이요\"라고 대답한 뒤 노래에 맞춰 춤을 추고 지나가는 형식입니다.",
                "Starting in 2022, content titled 'What song are you listening to?' became highly popular on platforms like YouTube Shorts, initially led by videos from creator Wasso. This content involved asking pedestrians who were walking with earphones in what song they were listening to, and it gained traction by satisfying the universal curiosity: 'What on earth are other people listening to?' Derived from this trend, a concept emerged where people would suddenly answer \"It's OOO's OOO\" even when asked a completely different question. As NewJeans' \"Hype Boy\" was massively popular in 2022, people frequently uploaded videos where they replied, \"It's NewJeans' Hype Boy, yo.\" Subsequently, one particular video featuring this reply along with the Hype Boy dance was uploaded to Instagram Reels. Parodies of that specific video then led to countless similar videos being uploaded across both Instagram and YouTube.",
                "'질문의 의도를 무시하고 내가 하고 싶은 말(또는 행동)을 하겠다'는 'MZ세대식 유머와 쿨함'을 상징합니다. 뜬금없는 상황에서도 유행하는 노래와 춤으로 분위기를 전환하거나, 질문을 회피하며 재미를 주는 데 중점을 둡니다.",
                "It embodies the \"MZ-style humor and coolness\" of ignoring the question and prioritizing one's own agenda or performance. It focuses on suddenly shifting the atmosphere with a popular song and dance, or humorously dodging the question.",
                "Q: \"저기, 혹시 홍대 가는 길이 어디예요?\" A: (이어폰 빼며) \"뉴진스의 하입보이요!\" (춤추기 시작)",
                "Q: \"Excuse me, could you tell me the way to Hongdae?\" A: (Removing an earbud) \"It's NewJeans' Hype Boy.\" (Starts dancing)",
                "./MemePicture/meme2022_M4.png"
            );

            MemeData meme2022_M5 = new MemeData(
                "2022",
                "재즈를 뭐라고 생각하세요?",
                "I can just [do OO] and that's it.",
                "1976년 그래미 어워드에서 가수 멜 토메(Mel Tormé)가 재즈의 전설 엘라 피츠제럴드(Ella Fitzgerald)에게 \"사람들에게 재즈가 무엇인지 어떻게 설명할 것인가?\"라고 질문했고, 엘라는 말 대신 즉흥적인 스캣(Scat)으로 대답했습니다. 웹툰 작가 주호민이 개인 방송 중 이 장면을 언급하며 엘라의 스캣을 코믹하게 따라 했고, 이 영상이 편집되어 널리 퍼졌습니다. 이후 다른 유튜버들이 이 장면에 피아노 연주곡을 삽입하는 등 여러 변형이 생기며 대중화되었습니다.",
                "The direct inspiration is from the 1976 Grammy Awards, where singer Mel Torm챕 asked jazz legend Ella Fitzgerald, \"How would you describe what jazz is to people?\" Fitzgerald famously replied not with words, but with an impromptu scat performance. The Korean meme was popularized after webtoon artist Joo Ho-min humorously recreated Ella��셲 scat response on his personal stream. This video was edited and spread widely. Subsequent popular variations involved adding piano music to the scene, making the phrase viral.",
                "'말이나 정의로 설명하기 어려운 대상'을 만났을 때, 그것을 '언어 외적인 방식(Scat)'으로 표현하며 유머러스하게 회피하거나, 즉흥성을 강조하는 데 사용됩니다.",
                "It is used when encountering a subject that is difficult to define or explain with words (like jazz). The meme is a humorous way to dodge a serious question by replying with an improvisational, non-verbal expression (the scat), emphasizing the subject's spontaneous nature.",
                "Q: \"당신에게 재즈는 뭐라고 생각하세요?\" A: (갑자기 스캣 시작) \"뫄아아... 두비두바아... 아아아...\"",
                "Q: \"What do you think of jazz?\" A: (Suddenly starts scatting) \"Bwahh... doobie-doo-baa... aaaah...\"",
                "./MemePicture/meme2022_M5.png"
            );

            MemeData meme2023_M1 = new MemeData(
                "2023",
                "너 T야",
                "Are you a T?",
                "코미디 유튜브 채널 밈고리즘의 폭스클립 콘텐츠에서 스케치 코미디를 연기하던 중 상대방이 감정적인 공감을 해주지 않고 논리적으로만 말하거나 무뚝뚝하게 반응할 때, 특유의 표정과 말투로 너 T야?라고 묻는 모습이 큰 화제가 되어서 유래가 되었습니다.",
                "Comedy It originated from the Fox Clip content of the YouTube channel MemeGorism, when the other person did not give emotional empathy and only spoke logically or reacted bluntly, asking, \"Are you T?\" with a unique expression and tone.",
                "한국 사회에서 F형들이 T형들의 직설적인 화법에 상처를 받거나 서운함을 느끼는 상황이 자주 밈으로 소비되었는데, 이 밈은 \"너 공감 능력 없지?\" 혹은 \"왜 이렇게 눈치가 없어?\"라는 말을 \"너 T야?\"라는 짧은 문장으로 압축해서 표현한 것입니다.",
                "In Korean society, situations in which F-type people were hurt or disappointed by T-type people's straightforward speech were often consumed as memes, which encapsulated the words \\\"You're not good at empathy, right?\" or \\\"Why are you so tactless?\" into a short sentence \\\"Are you T?\"",
                "\"나 오늘 너무 우울해서 빵 샀어...\" \"무슨 빵 샀는데?\"  \"...야, 너 T야?\"",
                "\\\"I was so depressed today that I bought bread...\" \\\"What bread did you buy? \\\"...Hey, are you a T?\"",
                "test6"
            );

            MemeData meme2023_M2 = new MemeData(
                "2023",
                "암오케이 암파인 괜찮아 닝닝닝닝닝",
                "Okay, I'm fine. Ningning, Ning, Ning, Ning, Ning",
                "인도네시아 스트리머 알딘이 스트리밍 중 게임에서 차가 부서지는 상황이 생기는데 그때 알딘이 모 한류 드라마의 개그씬이나 그 유명한 곡조를 배경으로 애써 한국말로 괜찮아를 반복하면서 우는 인도네시아인 영상을 팬이 클립으로 퍼뜨려 유행이 시작됬습니다.",
                "Indonesian streamer Aldin broke his car while streaming, and at that time, there was a context like an Indonesian video meme in which Aldin cried as he repeatedly said \"It's okay\" in Korean against the backdrop of a comedy scene or its famous tune of a Korean Wave drama.",
                "암울한 상황을 극복할 때 위로나 격려의 의미로 사용됩니다.",
                "It is used as a consolation or encouragement when overcoming a grim situation.",
                "(3시간 동안 작업한 엑셀 파일이 오류로 꺼졌는데, 저장을 안한 상황) \"저장... 안 했네? (눈가가 촉촉해지며) I'm okay... I'm fine... 3시간? 3 hours? Gwenchana... 다시 하면 돼... Gwenchana... 닝닝닝닝닝...\"",
                "(The Excel file I worked on for 3 hours turned off by error, but I didn't save it.) \\\"You didn't save it?\" I'm fine... I'm fine... 3 hours? 3 hours? Gwenchana... You can do it again... Gwenchana... Ning Ning Ning Ning Ning Ning Ning...\\\"",
                "test6"
            );

            MemeData meme2023_M3 = new MemeData(
                "2023",
                "슬릭백 챌린지",
                "Slickback Challenge",
                "jubi2fye라는 미국인 틱톡커가 LAKIM의 A Pimp Named SlickBack을 배경음악으로 해서 공중에서 미끄러지는 듯한 춤을 추는 슬릭백 챌린지를 처음 시작하여 유행이 퍼졌습니다.",
                "An American Tiktoker named jubi2fye first launched the Slickback Challenge, which features LAKIM's A Pimp Named SlickBack as the background music and dances like slipping through the air.",
                "특별한 의미가 있진 않고 챌린지의 한 종류 입니다.",
                "It doesn't have any special meaning and it's a kind of challenge.",
                "슬릭백 챌린지 영상을 찍는 것 자체를 예시로 볼 수 있습니다.",
                "Filming a Slickback Challenge video itself can be seen as an example.",
                "test6"
            );

            MemeData meme2023_M4 = new MemeData(
                "2023",
                "해피 캣",
                "happy cat",
                "2015년에 올라온 일본의 한 폐점한 펫샵에서 발견한 고양이를 데려가고 싶다고 트원 한 것이 시초입니다. 이 영상을 토대로 노래를 추가한 버전을 쇼츠에 올려 유행이 시작되었습니다.",
                "The beginning was that he wanted to take a cat he found at a closed pet shop in Japan in 2015. Based on this video, the trend began by posting a version of the song on Shorts.",
                "행복을 표현하는 용도로 많이 쓰입니다.",
                "It is used a lot to express happiness.",
                "보통 영상의 편집 효과로 행복을 표현할 때 자주 쓰입니다.",
                "Usually, it is often used to express happiness with the editing effect of a video.",
                "test6"
            );

            MemeData meme2023_M5 = new MemeData(
                "2023",
                "장충동왕족발보쌈",
                "Jangchung-dong Jokbal Bossam",
                "말왕이라는 유튜버가 올린 장충동왕족발보쌈 먹방 영상에 CM송을 부른 부분이 있습니다. 소음예술이라는 다른 유튜버가 해당 부분에 오케스트라를 입힌 영상이 알고리즘을 타면서 밈화 되었습니다.",
                "There is a part where a YouTuber named Mal-wang sang a CM song in the eating video of Jangchung-dong Jokbal Bossam. Another YouTuber named Noise Art put an orchestra on the part was made into a meme by using an algorithm.",
                "의미는 딱히 존재하지 않고 말왕의 좋은 발성과 특유의 묘한 중독성 때문에 따라하는 사람이 많아졌습니다.",
                "The meaning does not exist in particular, and many people imitate it because of the good vocalization of the king of horses and his peculiar addictive nature.",
                "보통 족발을 먹을때 해당 밈을 떠올립니다.",
                "Usually, it is often used to express happiness with the editing effect of a video.",
                "test6"
            );

            
            memeDataRepository.save(meme2022_M1);
            memeDataRepository.save(meme2022_M2);
            memeDataRepository.save(meme2022_M3);
            memeDataRepository.save(meme2022_M4);
            memeDataRepository.save(meme2022_M5);

            memeDataRepository.save(meme2023_M1);
            memeDataRepository.save(meme2023_M2);
            memeDataRepository.save(meme2023_M3);
            memeDataRepository.save(meme2023_M4);
            memeDataRepository.save(meme2023_M5);
            
        }

    }
}
