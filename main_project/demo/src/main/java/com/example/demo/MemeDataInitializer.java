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
                "/test1"
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
                "test2"
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
                "/test3"
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
                "/test4"
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
                "/test5"
            );

            memeDataRepository.save(meme2022_M1);
            memeDataRepository.save(meme2022_M2);
            memeDataRepository.save(meme2022_M3);
            memeDataRepository.save(meme2022_M4);
            memeDataRepository.save(meme2022_M5);
        }

    }
}
