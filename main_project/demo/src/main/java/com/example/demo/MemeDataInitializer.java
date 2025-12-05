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
                "/MemePicture/meme2022_M1.png",
                30
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
                "/MemePicture/meme2022_M2.png",
                29
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
                "/MemePicture/meme2022_M3.png",
                2
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
                "/MemePicture/meme2022_M4.png",
                3
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
                "/MemePicture/meme2022_M5.png",
                4
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
                "/MemePicture/meme2023_M1.png",
                5
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
                "/MemePicture/meme2023_M2.png",
                6
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
                "/MemePicture/meme2023_M3.png",
                7
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
                "/MemePicture/meme2023_M4.png",
                8
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
                "/MemePicture/meme2023_M5.png",
                9
            );


            MemeData meme2024_M1 = new MemeData(
                "2024",
                "꽁꽁 얼어붙은 한강 위로 고양이가 걸어다닙니다.",
                "A cat walks over the frozen Han River.",
                "2021년 12월 27일 MBN 뉴스 7이 보도한 '지하철역 동파사고 물벼락'이라는 뉴스 영상의 일부분이 사용됐다. 마침 빙판이 되어 얼어버린 뚝섬한강공원의 한강 위로 지나가던 노란색과 흰색의 얼룩무늬 고양이의 모습이 우연히 MBN 취재진들의 눈에 띄어서 촬영했고, 한파 관련 뉴스에 그대로 보도되어 쓰였다. SNS에서는 2022년부터 동절기에 발굴하여 쓰이다가 2024년 초 급부상하여 4월 초부터 해당 밈이 많은 연예인들이 따라하는 등 패러디와 챌린지로 확장된 후 일본, 동남아시아, 중화권, 영미권 등 해외로 퍼져 나갔다.",
                "On December 27, 2021, a part of a news video called \"Frozen Accident at Subway Station\" reported by MBN News 7 was used. A yellow and white spotted cat passing over the Han River in Ttukseom Hangang Park, which was frozen due to ice, accidentally caught the eyes of MBN reporters and was reported in the news about cold weather. On social media, it was discovered and used in the winter season from 2022, but it emerged in early 2024, and since early April, the meme has expanded into parody and challenge, with many celebrities following it, and has spread abroad, including Japan, Southeast Asia, China, and the Anglo-American region.",
                "영상과 대본이 일치하는 내용을 보여준 데다 딱딱한 내용을 주로 다루는 뉴스에서 보기 힘든 귀엽고 순수한 장면과 왠지 모를 리듬감이 느껴지는 나레이션이 함께 나오면서 묘한 중독성을 가져왔고 온라인 상에서 인기를 끌기 시작했다. 문장 자체가 밈으로 쓰기에는 긴 편이라, 줄여서 '꽁냥이'라고 부르기도 한다.",
                "In addition to showing the content that matches the video and the script, cute and pure scenes that are hard to see in the news mainly dealing with hard content and narration that felt a sense of rhythm, it brought about a strange addiction and began to gain popularity online. The sentence itself is long to write as a meme, so it is sometimes called kkong-nyang for short.",
                "꽁꽁 얼어붙은 한강 위로 OO이(가) 걸어다닙니다. 식으로 고양이를 다른 단어로 변경하거나 쇼츠를 활용해 챌린지를 하는 방식으로 사용된다.",
                "OO walks over the frozen Han River. It is used to change cats into different words or challenge them with shorts.",
                "/MemePicture/meme2024_M1.png",
                5
            );

            MemeData meme2024_M2 = new MemeData(
                "2024",
                "정상화(신창섭)",
                "Normalization (Shin-Changseop)",
                "2024년 5월부터 유행하며 인터넷에서 사용되었으며, 무언가 잘못되어 가는 상황에서 원래가 비정상이었고 현재가 정상화된 것이다’라고 비꼬는 데에서 사용된다.",
                "It has been popular since May 2024 and has been used on the Internet and is used to sarcastically say that it was originally abnormal and the present is normalized in a situation where something is going wrong.",
                "2023년 2월부터 메이플스토리라는 게임에서 일반 월드에 비해 리부트 월드가 캐릭터의 성장이 더 편하다는 것이 커뮤니티에서 논란이 되었다. 그러면서 일반 월드에서 플레이하던 유저들이 대거 리부트 월드로 넘어가며 게임 내 아이템 거래 등의 경제가 붕괴되었다. 그런데 게임 특성을 이용해 아이템을 팔아 돈을 벌던 사람들과 많은 재화를 투입하여 성장을 한 헤비 유저들이 기존 월드의 문제 해결이 아닌 리부트 월드의 하향을 원하였다. 그런 상황에서 게임 내 모종의 사건으로 무기 옵션 재설정을 게임 내 아이템이 아닌 게임 내 재화인 ‘메소’를 통해 할 수 있도록 변경되면서 리부트 월드의 혜택 중 하나였던 메소 획득량 5배를 없애 버렸고, 그 결과 리부트 월드의 유저 수가 80%나 감소하였다. 이를 보고 리부트 월드를 혐오하던 사람들이 ‘드디어 게임이 정상화되었다’며 기뻐했는데, 일반 월드에 혜택을 추가하는 게 아니라 리부트 월드의 혜택을 없애는 비정상적인 상태를 정상화되었다고 하는 것을 본 사람들이 게임 디렉터 김창섭과 해당 유저들을 AI를 이용해 노래로 만들어 희화화한게 대박 나면서 정상화 밈이 유행하기 시작했다.",
                "Starting in February 2023, it became controversial in the community that reboot world is easier to grow characters than regular world in the game Maple Story. As a result, a large number of users who played in the regular world moved to reboot world, and the economy, such as in-game item trading, collapsed. However, people who made money by selling items using game characteristics and heavy users who grew up by investing a lot of goods wanted the reboot world to go down rather than solving the problem of the existing world. In such a situation, some kind of in-game incident caused the reset of weapon options to be made through Messo an in-game good rather than an in-game item, eliminating five times the amount of Messo, which was one of the benefits of reboot world, resulting in an 80% decrease in the number of users in reboot world. People who hated reboot world were happy to see this, saying, \"The game has finally normalized, but normalization memes began to become popular as people who saw the abnormal state of removing the benefits of reboot world rather than adding benefits to the regular world became normalized by using AI to make fun of game director Kim Chang-seop and his users.",
                "단순히 정상화시키는 것에 그치지 않고요. 던전앤파이터의 재미를 극대화하는 날까지 최선을 다하겠습니다.(던전앤파이터 윤명진 대표이사)",
                "It's not just about normalizing. We'll do our best until we maximize the fun of Dungeon & Fighter. (Yoon Myung-jin, CEO of Dungeon & Fighter)",
                "/MemePicture/meme2024_M2.png",
                3
            );

            MemeData meme2024_M3 = new MemeData(
                "2024",
                "마라탕후루",
                "Maratang-hulu",
                "2024년 4월에 서이브가 발매한 곡의 제목이다.",
                "It is the title of a song released by Seo-Eve in April 2024.",
                "가사 내용은 좋아하는 선배에게 마라탕과 탕후루를 사달라는 간단한 내용으로, 후렴구 부분의 중독성이 높은 터라 해당 가사 부분의 춤을 따라 추는 것이 SNS에서 챌린지로 유행하면서 밈이 되었다. 억지 밈이고 음악성이 별로라는 말도 있었지만, 특유의 높은 중독성과 변형하기 쉽다는 점 때문에 유튜브나 SNS 등지에서 크게 유행했다. 무엇보다 당시 초등학교 6학년이 발매한 노래이다 보니 가사의 수위가 높지 않아 부담 없이 들을 수 있다는 것이 장점으로 꼽히기도 한다.",
                "The lyrics are simple to ask a favorite senior to buy Malatang and Tanghulu, and since the chorus part is highly addictive, dancing along to the lyrics became a meme as it became a challenge on SNS. Some said that it was a forced meme and the musicality was not good, but it was popular on YouTube and SNS because of its unique high addiction and ease of transformation. Above all, since the song was released by a sixth grader in elementary school at the time, it is considered an advantage that the lyrics are not high, so you can listen to it without any burden.",
                "해당 곡에 맞춰 춤을 따라 추는 쇼츠 챌린지가 그 예시이다.",
                "An example is the Shorts Challenge, which follows the dance to the song.",
                "/MemePicture/meme2024_M3.png",
                7
            );

            MemeData meme2024_M4 = new MemeData(
                "2024",
                "원영적 사고",
                "Thought as Jang-Wonyoung",
                "2024년 3월에 장원영의 트위터 팬계정이 장원영 프라이빗 메일을 패러디하여 작성한 게시글이 SNS에 퍼져나가면서 유명해졌고, 약 한 달 뒤인 2024년 4월에 기업 브랜딩 세미나에 등장하면서 커뮤니티에 빠르게 확산되었다.",
                "In March 2024, a post written by Jang Won-young's Twitter fan account parodying Jang Won-young's private mail spread on social media, and it quickly spread to the community about a month later, in April 2024, when it appeared at a corporate branding seminar.",
                "장원영의 긍정적 사고방식이 밈으로 유행한 것으로, 자신에게 일어나는 모든 사건들이 궁극적으로는 긍정적인 결과로 귀결될 것이라는 낙관주의를 기반으로 하고 있다. 부정적인 감정을 회피하는 것이 아니라 현 상황의 부정적인 상황도 결국 긍정적인 결과로 이어지는 과정 중의 하나로 생각하는 것이 핵심이다. 해당 밈을 사용할 때는 자신에게 발생한 부정적인 사건이나 상황이 불러일으킬 수 있는 긍정적인 결과를 말하면서, 마지막에는 ‘완전 럭키비키잖아~’라는 말을 붙인다.",
                "Jang Won-young's positive mindset was popular as a meme, based on optimism that all events that happen to him will ultimately lead to positive results. The key is not to avoid negative emotions, but to think of the current negative situation as one of the processes that eventually lead to positive results. When you use the meme, you say the positive consequences that can be caused by a negative event or situation that has occurred to you, and at the end, you add the phrase, \"It\'s a complete lucky Vicky.",
                "아이브가 마법소녀도 되고 호랑이도 된다고? 둘 다 한꺼번에 볼 수 있다니 럭키 다이브잖아(<IVE SWITCH> 앨범 프로모션)",
                "IVE can be a magic girl or a tiger? It\'s a lucky dive to be able to see both at once(album promotion of <IVE SWITCH>)",
                "/MemePicture/meme2024_M4.png",
                8
            );

            MemeData meme2024_M5 = new MemeData(
                "2024",
                "어제 내 세상이 무너졌어",
                "My world collapsed yesterday",
                "가장 오래된 패러디 글이 2018년 4월 6일이라 원본 글은 그 전에 작성된 것으로 보이는 글로, 고백을 받고 거절했는데 이에 대해 후회하는 내용이다.",
                "The oldest parody article is April 6, 2018, so the original article seems to have been written before that, and it was rejected after receiving a confession, but it is something I regret about.",
                "본격적으로 유행한 것은 2024년 초로, 당시 댓글에 ‘아 새벽이구나 ㅇㅈ’ 등 댓글들도 덤덤하게 받아치는 것 때문에 같이 유행했으며, 내용은 비극적이나 노래 가사나 시와 같이 운율이 느껴지고 새벽 1시에 후회를 담아 쓰는 것이 웃음을 사서 커뮤니티 내에서 패러디가 나오며 유행하였다. 유행이 어느정도 사그라든 후에도 보통 세대 차이를 느끼거나 문화충격을 받아 자신의 상식이 무너졌을 때 해당 밈을 관용구처럼 활용하고 있다.",
                "It was in full swing in early 2024, and it was popular because comments such as \"Oh, it's dawn\" were also calmly responded to, and the content was tragic, but it was popular to write with regret at 1 a.m. because it was funny and parody came out in the community. Even after the trend has died down to some extent, they usually use the meme like an idiom when they feel generational differences or when their common sense collapses due to a culture shock.",
                "어제 내 학점이 무너졌어. 레포트 제출해야했는데 못했어. 한순간에 점수 0점으로 반영되더라. 너무힘들어 지금도 울고있어. 후회된다 매일밤 미뤘던게. 너무너무아쉬워 내 목숨을 가져가도 좋아. 제발 추가제출 받아줘",
                "My grades collapsed yesterday. I had to submit a report, but I couldn't. It was reflected as 0 points in an instant. I'm so tired. I'm still crying. I regret that I put it off every night. It\'s too bad. You can take my life. Please accept additional submissions",
                "/MemePicture/meme2024_M5.png",
                9
            );


            MemeData meme2025_M1 = new MemeData(
                "2025",
                "이탈리안 브레인롯",
                "Italian Brainrot",
                "2024년부터 알음알음 퍼지던 밈이 2025년 1월에 올라온 트랄랄레로 트랄랄라 라는 캐릭터가 대박이 터지며 온갖 종류의 크리처들이 등장, 크게 유행하기 시작했다.",
                "The meme, which had been spreading since 2024, began to become popular with the emergence of all kinds of creators as the character Tralero Tralala, which was posted in January 2025, became a big hit.",
                "동물과 사물을 AI를 이용해 조악한 크리처를 생성하고 이탈리아어를 기반으로 말장난으로 이름과 설정을 만들어 캐릭터를 만들거나 그런 캐릭터들로 누가 가장 강한가 등의 놀이를 하는 것이 주 내용이다. 영미권에서 시작되어 아시아에도 널리 퍼지며 동남아시아 국가인 인도네시아에서 퉁퉁퉁퉁퉁퉁 사후르 라는 캐릭터가 큰 인기를 끌었다. 하지만 다른 방식으로의 변형이 어렵다는 점 때문에 2025년 5월 말부터 점점 사그라들어 6월부터는 거의 없어져버렸다.",
                "The main content is to create crude creators of animals and objects using AI, create characters by making names and settings with puns based on Italian, or play with such characters, such as who is the strongest. It started in the Anglo-American world and spread widely in Asia, especially in Indonesia, a Southeast Asian country, where the character Tung Tung Tung Tung Tung Hussur was very popular. However, due to the difficulty of transformation in other ways, it gradually disappeared from the end of May 2025, and almost disappeared from June",
                "트랄랄렐로 트랄랄라, 퉁퉁퉁퉁퉁퉁퉁퉁퉁사후르 등",
                "Tralalero tralala, Tung Tung Tung Tung Tung Tung Tung Tung Tung Sahur",
                "/MemePicture/meme2025_M1.png",
                5
            );

            MemeData meme2025_M2 = new MemeData(
                "2025",
                "테토-에겐 성격 유형",
                "Testosterone-estrogen personality type",
                "2021년 6월에 처음 등장하였으며, 2024년 3월에 인스타툰 작가 내쪼가 테토남 개념을 웹툰 형식으로 인스타그램에 게시한 것을 중심으로 알음알음 퍼져나가다 2025년 중반에 ‘테토남’, ‘에겐녀’라는 용어가 크게 유행하기 시작했다.",
                "It first appeared in June 2021, and in March 2024, the term \"tetonam\" and \"female\" began to become popular in mid-2025, focusing on Instagram's posting of the concept of Tetonam in a webtoon format.",
                "테스토스테론과 에스트로겐이라는 남녀 성별의 대표적인 성 호르몬들에 따른 성격 유형 구분으로사람의 성격을 성 호르몬에 따라 구분한 것이라 볼 수 있으며, MBTI 혹은 혈액형별 성격 등과 유사하다고 볼 수 있으며 자신의 성격에 따라 테토남, 테토녀, 에겐남, 에겐녀 등으로 나누어 자신의 성격을 표현하거나, 다른 사람의 성격을 이야기할 때 주로 사용되고 있다.",
                "It can be seen that a person's personality is classified according to sex hormones by classifying them according to gender representative sex hormones such as testosterone and estrogen, and it can be seen as similar to MBTI or blood type personality, and it is mainly used to express one's personality by dividing it into Tetonam, Tetonyeo, Egennam, Egenyeo, etc. according to one's personality.",
                "난 그냥 내가 하고 싶은 말은 시원하게 내뱉는 테토남이야.",
                "I'm just a Tetonam who spews what I want to say.",
                "/MemePicture/meme2025_M2.png",
                3
            );

            MemeData meme2025_M3 = new MemeData(
                "2025",
                "골반이 안 멈추는데 어떡해",
                "My pelvis won't stop. What should I do?",
                "2025년 10월부터 유행하기 시작한 밈으로, AOA의 짧은 치마를 배경음악으로 사용한 쇼츠이다.",
                "It is a meme that began to be popular in October 2025 and is shorts using AOA's short skirt as background music.",
                "내용은 골반이 계속 움직이는 희귀병에 걸린 여성이 이별 후 홧김에 클럽에 갔는데 낯선 남자에게 플러팅 당한다는 내용이다. 중독성이 강하다고 좋아하는 사람들이 있는 만큼 왜 유행하는지 모르겠다는 사람들도 있는, 호불호가 갈리는 밈이지만 원본 쇼츠의 배경음악으로 사용된 ‘짧은 치마’는 특유의 중독성으로 인해 다시 역주행하고 있다.",
                "The story is about a woman with a rare disease whose pelvis continues to move, who went to a club in anger after the breakup and was fluttered by a strange man. Some people like it because it's addictive, and some people don't know why it's popular, but \"Short Skirt,\" used as the background music of the original shorts, is backtracking again due to its unique addictive nature.",
                "주로 SNS에 챌린지 형식으로 똑같이 따라하거나 내용을 바꿔서 만드는 쇼츠가 많이 나왔다.",
                "There have been many shorts on SNS that imitate or change the contents in the same way in the form of a challenge.",
                "/MemePicture/meme2025_M3.png",
                7
            );

            MemeData meme2025_M4 = new MemeData(
                "2025",
                "ChatGPT의 지브리풍 이미지 생성",
                "Create a Ghibli-style image of ChatGPT",
                "2025년 3월 26일부터 유명한 애니메이션 회사인 지브리의 화풍을 이용해 기존의 이미지를 바꾸는 것이 유행을 탔다.",
                "Since March 26, 2025, it has become popular to change existing images using the style of Ghibli, a famous animation company.",
                "생성형 AI인 ChatGPT가 많이 쓰이게 되면서 지브리 사의 그림체로 이미지를 만드는 것이 유행을 탔고 디즈니, 심슨 가족 등의 화풍을 기반으로 이미지 파일을 변경해 올리는 경우도 있었다. 지브리 사의 공식 입장은 없으나, 지브리 사의 화풍을 무단으로 베낀다는 저작권 논란이 크게 불거졌으며, 그림 작가들의 실업 문제에 관련한 논란도 커지게 되었다. 실제로 포켓몬스터 등 몇몇 그림체들은 저작권 문제로 화풍 변경이 불가능한 경우도 존재한다.",
                "As ChatGPT, a generative AI, became widely used, creating images with Ghibli's painting style became popular, and there were cases where image files were changed and uploaded based on the painting style of Disney and The Simpsons. Although Ghibli has no official position, there has been a great copyright controversy over copying Ghibli's painting style without permission, and the controversy over the unemployment of painting artists has grown. In fact, there are cases where it is impossible to change the painting style of some painting bodies, such as Pokémon, due to copyright issues.",
                "주로 촬영해둔 인물 사진을 바꾸며, 자신의 사진이나 유명인들의 사진을 사용하는 경우가 거의 대부분이다.",
                "They usually change their photographs of people they have taken, and most of them use pictures of themselves or celebrities.",
                "/MemePicture/meme2025_M4.png",
                8
            );

            MemeData meme2025_M5 = new MemeData(
                "2025",
                "영포티",
                "young 40",
                "라이프 트렌드 2016(부키)을 출간한 트렌드 분석가 김용섭이 ‘젊게 살려고 하는 40대’를 지칭하기 위하여 영포티라는 단어를 제안했고, 당시 언론들이 이를 적극 수용하며 사용하기 시작했다.",
                "Kim Yong-seop, a trend analyst who published Life Trend 2016 (bookie), proposed the word \"youngpotty\" to refer to those in their 40s trying to live young, and the media began to actively accept and use it.",
                "젊은이들의 문화를 따라 하려 하거나, 나이에 어울리지 않는다고 여겨지는 패션이나 취미(스트리트 패션, 일부 스포츠카, 카니발 등)를 고집하는 40대를 조롱하는 맥락에서 사용되기도 합니다.",
                "It is sometimes used in the context of trying to imitate the culture of young people or mocking those in their 40s who insist on fashion or hobbies (street fashion, some sports cars, carnival, etc.) that are considered unsuitable for their age.",
                "\"저 아저씨는 영포티룩의 정석이네. 뉴에라 모자에 로고 박힌 티셔츠, 슬림핏 청바지까지 풀세트다.\"",
                "He's the standard of a young-looking guy. He's wearing a full set with a New Era cap, a T-shirt with a logo on it, and even slim-fit jeans.",
                "/MemePicture/meme2025_M5.png",
                9
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

            memeDataRepository.save(meme2024_M1);
            memeDataRepository.save(meme2024_M2);
            memeDataRepository.save(meme2024_M3);
            memeDataRepository.save(meme2024_M4);
            memeDataRepository.save(meme2024_M5);

            memeDataRepository.save(meme2025_M1);
            memeDataRepository.save(meme2025_M2);
            memeDataRepository.save(meme2025_M3);
            memeDataRepository.save(meme2025_M4);
            memeDataRepository.save(meme2025_M5);


            
        }

    }
}
