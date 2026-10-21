const config = {
	//网页元数据
	metaData: {
		title: '狂生的个人主页🎉',
		description: '欢迎来到狂生的奇怪世界！',
		keywords: '狂生,个人主页,个人网站',
		icon: 'img/avatar.jpg'   //网页图标，支持外链
	},

	avatar: "img/avatar.jpg", // 头像
	welcometitle: "Hi, I'm kuangsheng", // 标题

	// 颜色配置
	color: {
		themecolor: "#FFFFFF", // 主题颜色，推荐趋于亮白可带有轻微色调，例： #D1FFEC
		welcometitlecolor: "#FFFFFF", // 标题颜色 例： #7BFFC9
		turntablecolor1: "#FFFF00",  // 转盘渐变色一
		turntablecolor2: "#00FFFF"   // 转盘渐变色二
	},

	brightness: 85, // 背景亮度 --%
	blur: 5, // 毛玻璃模糊效果

	// 我的标签
	
	tags: [
		{
			name: '电气',
			color: '#FFD700',
			icon: '⚡',
			hoverEffect: 'spark',
			description: '电流与思维的碰撞'
		},
		{
			name: '理工',
			color: '#00CED1',
			icon: '🔬',
			hoverEffect: 'rotate',
			description: '逻辑与创新的艺术'
		},
		{
			name: '艺术',
			color: '#FF69B4',
			icon: '🎨',
			hoverEffect: 'pulse',
			description: '灵感与美的表达'
		},
		{
			name: '编程',
			color: '#32CD32',
			icon: '💻',
			hoverEffect: 'glitch',
			description: '代码构建的世界'
		},
		{
			name: '音乐',
			color: '#FF6347',
			icon: '🎵',
			hoverEffect: 'bounce',
			description: '节奏与情感的共鸣'
		},
		
	],

	// 默认背景壁纸
	background: {
		"pc": {   //pc端
			"type": "pic",   //"pic":静态壁纸;"video":动态壁纸
			"datainfo": {
				"title": "苏联",
				"preview": "img/wallpaper/static/苏联/image.png",
			//	"url":"https://t.mwm.moe/pc"
				"url": "img/wallpaper/static/苏联/image.png",     //当然，也可填写网络地址或壁纸api，如随机PC壁纸api："url":"https://t.mwm.moe/pc"
			},
		},
		"mobile": {   //移动端
			"type": "pic",
			"datainfo": {
				"title": "0001",
				"preview": "img/wallpaper/static-mobile/0001/image-pre.webp",
			//	"url":"链接26"
				"url": "img/wallpaper/static-mobile/0001/image.png"  //同理，随机移动端壁纸："url":"https://t.mwm.moe/mp"
			}
		}

	},

	//极坐标图数据
	polarChart: {
		skills: ['文化','技术','知识'],
		skillPoints: [66,66,66],
				skillLinks: [
			'https://suunion.online:8888/down/FeUJvS0lfMrW',
			'https://github.com/hunyuantaishanghuang', // 文化相关链接
			// 技术相关链接
			'https://suunion.online:8888/down/Mhjd5GdRruHc'  // 知识相关链接
		]
	},

	//社交按钮
	socialPlatformIcons: [
		{ icon: "mdi-github", link: "https://github.com/hunyuantaishanghuang" },
		{ icon: "mdi-email", link: "mailto:2727314616@qq.com" },
		{ icon: "mdi-qqchat", link: "https://2727314616.suunion.online/" },
		{ icon: "mdi-wechat", link: "#" },

	],

	//打字机
	typeWriterStrings:
	[		
	    "致敬，伟大的工人阶级，是他们创造了这个社会绝大多数的财富和价值，同时，致敬那些以工人阶级身份为荣，或者那些虽不是工人，但依旧尊重工人，以自己特有的方式建设社会的劳动者。我们的劳动是有尊严的，或许我们出卖我们的劳动力换取了金钱，但不远的将来，我们的劳动只会是一种贡献与荣誉，而不是商品。我们的同志会继续奋斗，团结一切可以团结的，而不是因各种差异而产生歧视。我们的战斗依旧继续，我们将重振工人的尊严与荣光.歌曲:L'internationale",
	    "北极星陨落在冰原，凄凉，清美，透彻，可那束光依旧划破了天空，辐射到了每个人的心中，缅怀.歌曲:Lied der unruhevollen",
	    "夜晚的独自喃喃，有一种心碎与挣扎，可倏然破晓，升跃，呐喊与金光传遍天空，傲然面对之前隐匿的痛苦与孤独。一步一步，逐渐坚定，眼中闪烁着朝阳，依旧自语，可不再破碎，而是坦然，是不再渴望认可的自信与陈述。渐渐，天大明，骄阳披抚，海阔天空，仅是站在那里，便是世界的中央，是别人之瞩目，我便是自我的王者，狂野，不羁，万千丝线于空中断裂，在呐喊里化为游丝随风飘走，只剩下一个蜕变的，又不再改变的自我留在这片辽阔。歌曲:天空没有极限 (粤)",
	    "面对生命之一切不可解，而我仍能面对自己说：生命是值得经历的，他是独一无二的。",
		"我选择，我承担，我成为我",
		"世界上最锋利，最强大的武器是什么？……是刀戈？不，那太依赖个人武力……是枪炮？不，那东西带来的只有焚烧与毁坏……那么是什么？我来告诉你，我的同志——是镰刀和锤子，是镰刀收割的庄稼与锤子打造的机器，是种出庄稼的农民和操纵机器的工人，是创造这一切奇迹的伟大劳动者。同志，你问我为什么？我只能告诉你，生产才是世界上最强大的东西，拥有他，你就掌握了一切，包括历史和未来，以及最重要的现在。而拥有并时刻使用生产的，便是这个世界的主人。他们不是那些衣冠楚楚，从不知土地与机械何样的家伙，那些家伙只是面包上的蝇虫，而拥有面包的，只有生产者，劳动者。歌曲:The Battle Goes On",
		"感觉每一枚音符，每一缕旋律，都在轻哼着“没什么大不了”，就像云端飞翔，身躯狂放舒展，四肢随性拨动，忽而紧紧搂住自我，忽而尽情旋舞，天地也为之倾覆。仿佛每一个肢体都有了意志，在向外跃动，要抽离，要自由。忘我间，天空破晓，沐浴金光，重力也被我抛开，灵魂变得暖洋洋的，变得轻越，变得悬浮。歌曲： なんでもないや (没什么大不了)",

		"一段话描述不了一个人波澜壮阔的一生。如果你在试图通过这段文字了解一个人，那不妨去看，去听，去观察这个会哭会笑的，完完整整的，不完美但却在改变的人",
		"理智的叩门打搅了心的涟漪，更多的会泯灭，但总有的会掀起波澜壮阔的潮，使惊涛一片连成一片，向外翻涌，化为泪，变成阳光下闪闪的痕迹。",
		"我仿佛看见，姑娘微微撇过脑袋，两只大眼睛却直勾勾盯着那个剑客。      看什么？有什么好看的？      谁看啦？才没有！        又悄悄把手掌挽着那个人的手。        哼……        歌曲:为爱追寻",
		"O Captain! My Captain! our fearful trip is done,The ship has weather'd every rack, the prize we sought is won,The port is near, the bells I hear, the people all exulting,While follow eyes the steady keel, the vessel grim and daring;But O heart! heart! heart!O the bleeding drops of red,Where on the deck my Captain lies,Fallen cold and dead.",
		"英雄什么的，我不在乎，你就是家的幽径，是我的灯塔，亦是我之坟碑，回来，回来，你故去战友不想在此时看见你，你的爱人还在等待，回来，回来，你的强大，你的理想，在他们看来一文不值，回来，可以吗，回来做我的英雄歌曲:\nZero Eclipse",
		"什么东西破碎，零落散在地上，月光寂静，映照着内心的凄楚与酸痛，悄然抬头，望见破旧的木质窗辕，曦光欢快地扑向尘，擦肩瞬间，消弭于空间，剩下淡淡金点还在勾勒最后一刻，你的指尖与我相触。什么东西暖暖的，划过了我的脸庞，是泪，是倒映你的欢笑的记忆，是秋日的清晨，金黄满天，可我只看见你披着婚纱向我走来，我拥你入怀，你那么轻盈，又爱玩，调皮地躲着我，躲在了曦光里，躲在了我的记忆里，消失在我的视线，褪色于我的脑海，只剩下无数金色，剩下我躲在过去，躲在尘埃，躲在了你与我相见的那个黎明之前。那朵月色，是相恋的预兆，是一切的伊始。歌曲:尘曦",
		"朋友啊，拿起笔吧，风轰击纸张的声音，是自由的号角，我们的血，便是画作最好的颜料，朋友啊，不要畏惧天空，我们诗已然描摹了地狱天堂的模样，神像畏惧烈火，可我们的自由的心，却在此翱翔。歌曲:文艺复兴",
		"不知道为什么，比悲伤更加难受，比直面鲜血淋漓的现实更加哀默的，大概就是这种永远在希冀着的等待与鸠酒般的口渴的回忆歌曲:世末歌者",
		"青衣姑娘青葱般的柔夷轻抚面前人的脸颊，冰凉而热烈，那是她在桃树枝头嬉笑的家伙，是她在书桌前调戏的呆子，是共游山海的谪仙，是她的心，她的泪，是朦胧的远处婚宴的新郎，是梦醒后的枕边人.歌曲:人间月",
		"他不是将军，不是英雄，甚或长相普通，身材矮小，而那个姑娘也不过一介农家采桑女，面色蜡黄，长得瘦弱，但这并不妨碍相思的线连接异地，跨越万里，让高居星河的月为之映照，让微不足道的萤火刺透浓厚的漆黑。歌曲:月出",
		"有人说这首歌恐怖，是的，一切不平都会被踏平，一切不公都会被进攻，没有理想的人，会恐惧他的伟力，当然，这首歌也是一首情歌，蕴藏世界对烈火，光明，希望的绵绵情意，饱含无数年轻男女对世界真挚的爱意。这首歌是无声的，因为一旦出声，必会天崩地裂，这首歌是有声的，在你我心中，在黑暗的地方，他默默回响。这是你，我，世界每个人，每个民族，每个国家的共同嗓音，是人类的呐喊歌曲:L'internationale",
		
		"想你了……           \n案几旁，柔光下，我已不知第几次这般呆愣着了。        \n踌躇了3141秒（我的心在原地转圈圈），在诸如：        \n“你，可安康……”      \n\n“想来近来气温骤降，流感多发，千万记得多穿衣裳，别冻着”          \n\n“秋的南国，不凉。异于北方马路两边的醉红一片，这里的叶子很青，很青”      \n\n……\n\n我还是决定抛开层层的遮掩，切去篇篇的浮夸，心疼你去猜，去纠结我究竟意欲如何。      \n\n想你了。        \n\n不论我做了几千几万字的解释，加了数不胜数的掩饰，只有这三个字却是最真实，最无法掩盖的。      \n\n我挤压灵魂，才流出这么些勉强入得了眼的话语：        \n\n“一封信的厚度，是你与我间，心的距离。”      \n\n“不妨看看这封信吧，一横一撇，勾画了我的纠结，一字一句，镌刻了思念的纹理。”      \n\n请原谅我的固执与笨拙，我不屑用别人用过不知多少遍的二手，三手……N手货，确也写不出多少勾人的蜜语。     \n\n同时，我还要向你道歉的是，哪怕想你千百回，也不过动动沉重的笔头，潦草记下几句疯言疯语，却迟迟不敢寄出。      \n\n是的，我是说过，我们间隔着不过小小一张纸的厚度。        \n\n可就是如此薄的一张纸，因我的怯懦，与你差距着千山万水。      \n\n就是这样短的一封信，我为之踌躇的时间，可以圈出一个月亮的周长。      \n\n我不禁一次地遐想，万一，万一你等的太着急，急得你炸毛了又该怎样安抚你那过分保护的柔软的心。      \n\n万一，你心灰意冷，自此对我无了感动，无了期待，无了耐心……我又怎般弥合那因我而皲裂的峡谷。        \n\n万一，你心有所属，我又如何自处，是如鸵鸟将土塞入眼睛，用失感自欺，或另寻新欢，将流浪的心塞入陌生的旅馆，搂着风流说着夺情，还是堕入虚无，唱着了无，生出舍利……        \n\n我好怕，怕你的拒绝与生硬，怕你的失落与放弃，但更怕我的冒昧惊扰你的平静，更怕我的失礼打搅你的甜蜜……      \n\n但我还是要写这封信，不问结果。      \n\n我想告诉你，世界上至少还有一个人，对你思念眷恋与流连。      \n\n我想告诉你，当你想要找个角落躲起来，听不进劝告与安慰时，会有人摸索着，默默坐在你的身旁，拭去你脸庞过多的泪，在寒冷时给你大大的拥抱，在你哭累了借个肩膀依靠……不会问你为什么哭，不会着急拉你离开。        \n\n我想告诉你，这个世界上，有人喜欢过你，不论你如何，就是喜欢你，现在是，以后也是。        \n\n想你。"
	],

	//音乐播放配置，采用MetingJS Api(https://github.com/metowolf/MetingJS)
	musicPlayer: {
		server: 'tencent',  //服务提供商 --网易云音乐
		type: 'playlist',   //歌单类型
		id: '9621540160'  //歌单id ---> music.163.com/#/playlist?id=2028178887
	},

	//壁纸数据 -----可以将壁纸文件上传到图床获取网络直链。若想调用api，请前往脚本自行修改逻辑
	wallpaper: {
		pic: [
			{ "title": "海洋女孩", "preview": "img/wallpaper/static/海洋女孩/image-pre.webp", "url": "img/wallpaper/static/海洋女孩/image.png" },
			{ "title": "书房夜晚", "preview": "img/wallpaper/static/书房夜晚/image-pre.webp", "url": "img/wallpaper/static/书房夜晚/image.png" },
			{ "title": "安逸舒适", "preview": "img/wallpaper/static/安逸舒适/image-pre.webp", "url": "img/wallpaper/static/安逸舒适/image.png" },
			{ "title": "jswcMaMj", "preview": "https://s21.ax1x.com/2025/07/23/pVGli59.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVGli59.jpg" },
			{ "title": "pgtTqoqq", "preview": "https://s21.ax1x.com/2025/07/23/pVGlmDO.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVGlmDO.jpg" },
			{ "title": "cvKMKhue", "preview": "https://s21.ax1x.com/2025/07/23/pVGlNqS.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVGlNqS.jpg" },
			{ "title": "XpxvQVoP", "preview": "https://s21.ax1x.com/2025/07/23/pVGlfIJ.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVGlfIJ.jpg" },
			{ "title": "fVEEjEOA", "preview": "https://s21.ax1x.com/2025/07/23/pVGlEgx.md.webp", "url": "https://s21.ax1x.com/2025/07/23/pVGlEgx.webp" },
			{ "title": "jgnIKMpd", "preview": "https://s21.ax1x.com/2025/07/23/pVGldaQ.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVGldaQ.jpg" },
			{ "title": "mgqyySeh", "preview": "https://s21.ax1x.com/2025/07/23/pVGl82t.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVGl82t.jpg" },
			{ "title": "dSXZfZp", "preview": "https://s21.ax1x.com/2025/07/23/pVGlaVg.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVGlaVg.jpg" },
		],
		picMobile: [
			{ "title": "0001", "preview": "img/wallpaper/static-mobile/0001/image-pre.webp", "url": "img/wallpaper/static-mobile/0001/image.png" },
			{ "title": "0002", "preview": "img/wallpaper/static-mobile/0002/image-pre.webp", "url": "img/wallpaper/static-mobile/0002/image.png" },
			{ "title": "0003", "preview": "img/wallpaper/static-mobile/0003/image-pre.webp", "url": "img/wallpaper/static-mobile/0003/image.png" },
			{ "title": "0004", "preview": "img/wallpaper/static-mobile/0004/image-pre.webp", "url": "img/wallpaper/static-mobile/0004/image.png" },
			{ "title": "DfNHPPcc", "preview": "https://s21.ax1x.com/2025/07/23/pVG1uQ0.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVG1uQ0.jpg" },
			{ "title": "cZZwzhis", "preview": "https://s21.ax1x.com/2025/07/23/pVG1Vij.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVG1Vij.jpg" },
			{ "title": "aANKZHPX", "preview": "https://s21.ax1x.com/2025/07/23/pVGlIR1.md.jpg", "url": "https://s21.ax1x.com/2025/07/23/pVGlIR1.jpg" },
		],
		video: [
			{
				"title": "尼尔：机械纪元 团队",
				"preview": "img/wallpaper/dynamic/尼尔：机械纪元 团队/Nier-Automata-Team-pre.webm",
				"url": "img/wallpaper/dynamic/尼尔：机械纪元 团队/Nier-Automata-Team.webm"
			},
			{
				"title": "向往航天的女孩",
				"preview": "img/wallpaper/dynamic/向往航天的女孩/Toy-Aeroplane-pre.webm",
				"url": "img/wallpaper/dynamic/向往航天的女孩/Toy-Aeroplane.webm"
			},
			{
				"title": "世界很温柔《龙族》上杉绘梨衣",
				"preview": "https://www.leleo.top/img/wallpaper/dynamic/%E4%B8%96%E7%95%8C%E5%BE%88%E6%B8%A9%E6%9F%94%E3%80%8A%E9%BE%99%E6%97%8F%E3%80%8B%E4%B8%8A%E6%9D%89%E7%BB%98%E6%A2%A8%E8%A1%A3/A2EF5E85-pre.webm",
				"url": "https://www.leleo.top/img/wallpaper/dynamic/%E4%B8%96%E7%95%8C%E5%BE%88%E6%B8%A9%E6%9F%94%E3%80%8A%E9%BE%99%E6%97%8F%E3%80%8B%E4%B8%8A%E6%9D%89%E7%BB%98%E6%A2%A8%E8%A1%A3/A2EF5E85.webm"
			},
		],
		videoMobile: [
			{
				"title": "幻觉镇-gaako_illust",
				"preview": "img/wallpaper/dynamic-mobile/幻觉镇-gaako_illust/Hallucination_town-pre.mp4",
				"url": "img/wallpaper/dynamic-mobile/幻觉镇-gaako_illust/Hallucination_town.mp4"
			},
			{
				"title": "chuva",
				"preview": "img/wallpaper/dynamic-mobile/chuva/chuva-pre.mp4",
				"url": "img/wallpaper/dynamic-mobile/chuva/chuva.mp4"
			},
			{
				"title": "Doodle-小猫女仆降临",
				"preview": "img/wallpaper/dynamic-mobile/Doodle-小猫女仆降临/d12-pre.mp4",
				"url": "img/wallpaper/dynamic-mobile/Doodle-小猫女仆降临/d12.mp4"
			},
		],
	},

	//项目卡片 其中 字段"show"控制初始卡片的text是否展开
	projectcards: [
	    { go: "🚀 前往", img: "img/sunshine.jpg", title: "简易网盘", subtitle: "随时可用", text: "闲的没事展开干什么呢，其他的内容都一样的，别展开了呀", url: "https://wp.suunion.online/", show: false },
		{ go: "🗂️ 前往", img: "img/a.png", title: "网盘", subtitle:" 一个网盘，比百度网盘强点，就亿点点，但是速度并不特别出色", text: "怎么还展呀开，真的没什么好看的呀，就一个普普通通的个人网站呀，这里面怎么可能写有关个人隐私或者其它东西呀", url: "http://nas.suunion.online/", show: false },
		{ go: "👍 前往", img: "img/c.jpg", title: "bt", subtitle: "不是变态，而是bt，也不是鼻涕，是bt", text: "当然，陌生人也欢迎，要联系我可以找找我联系方式", url: "https://suunion.online:8888/888888/", show: false },
		{ go: "💍 前往", img: "img/f.jpg", title: "小游戏 ", subtitle: "game", text: "随机送一个网盘账号哦，你猜猜哪里能得到", url: "https://game.suunion.online", show: false },
		{ go: "🔍 前往", img: "img/z.jpg", title: "调试", subtitle: "谨慎，不要随便点击陌生网页", text: "提醒！这里面几乎没有多余的布置。", url: "https://bug.suunion.online",show: false },
	],

	statement: ["备案号：日本省cqu备2024号", "Copyright © 2027 suunion"],

	// 隐藏诗歌模块（特殊触发）
	hiddenPoems: {
		enabled: true, // 是否启用隐藏诗歌功能
		trigger: {
			type: "multi", // 触发类型：multi-多次点击, time-特定时间, combo-组合操作
			params: {
				// 多次点击触发
				clickCount: 10, // 点击5次触发
				clickElement: "welcome", // 点击欢迎标题触发
				// 转盘触发（连击3次）
				turntableClicks: 7,
				// 特定时间触发
				timeRange: [], // 夜晚时段自动显示
				// 组合操作：按住Shift点击3次
				combo: ["shift", 3]
			}
		},
		
		// 诗歌数据
		poems: [
		    {
  id: 1,
  title: "朦胧",
  content: `在笔墨的秩序里迷醉\n在依稀的疏影下风吹\n轻抚六月夏花之嫩蕊\n静观慵懒云驹之酣睡\n\n这一场醉，醉了十年仍未醒\n至今犹觉踉跄，犹觉未甘。\n这缕碎风，吹了二十年未尽\n摇摇曳曳，枝繁未必生根\n这簇花蕊，静待三十年未开\n青春不在形骸，何必羡少年\n这团云朵，人间一百年未醒\n只觉世人忙碌，心安即吾乡`,
  mood: "迷离",
  showCondition: "always",
  triggerType: "turntable" // 标题触发
},
{
  id: 2,
  title: "撼人的舞",
  content: `像朦胧，似迷蒙，\n钝晕摇晃心房，\n轻捷，跳跃，照彻。\n——是青春。`,
  mood: "激昂",
  showCondition: "always",
  triggerType: "turntable" // 标题触发
},
{
  id: 3,
  title: "火会灭",
  content: `火会灭\n风会停歇\n漆黑的星熟睡在月的臂弯\n尘在哀叹……\n这时，\n曦光不再跳跃\n胸腔不再起伏\n静眠的山丘\n荡漾着银鳞般的湖\n偶有一粒沙摩挲枯寒的颊\n苍白而干萎\n泪不再是银河的水\n她成了冰砾\n成了寒霜\n变成固体\n随时升华\n随时消声灭迹。`,
  mood: "寂灭",
  showCondition: "always",
  triggerType: "turntable"
},
{
  id: 4,
  title: "诗论",
  content: `诗，绝不是文字的堆砌，就像沙子无法雕垒为宫殿。诗萌芽于生活，扎根在苟且与凡庸，却绽放着柔和。她不是生活的对立，不是陋与丑的反面，她是他们的一部分。但就因为此，她才是美的，是希望的。`,
  mood: "哲思",
  showCondition: "always",
  triggerType: "turntable"
},
{
  id: 5,
  title: "夜的静谧",
  content: `夜的静谧，\n光的藏匿，\n空气的悄息，\n影子也消弭。\n孤零零的心独自游荡，\n就像白天那样，\n只是现在不再高亢，\n现在只剩一片茫茫。\n喧嚣的掩饰不再，\n理智的干涉不再，\n褪去靓丽的声彩，\n滞留着冷冽黑白。\n寻觅，寻觅\n寻一片干净的天地\n那里有桃夭与棠棣\n那里的昼没有边际`,
  mood: "孤寂",
  showCondition: "night",
  triggerType: "turntable"
},
{
  id: 6,
  title: "怨相离",
  content: `怨相离，\n怨相离，\n何必相思。\n欲摘春花与霜辞，\n奈何雨凄凄，\n平白侵素衣。\n青苔叠千紫，\n未见绿爬枝。\n劳燕云上辞\n鸳鸯池中戏。\n谁晓孤人迹，\n更将幽境觅。`,
  mood: "哀怨",
  showCondition: "random",
  triggerType: "turntable"
},
{
  id: 7,
  title: "火会灭(二)",
  content: `火会灭\n风会停歇\n漆黑的星熟睡在月的臂弯\n尘在哀叹……\n这时，\n曦光不再跳跃\n胸腔不再起伏\n静眠的山丘\n荡漾着银鳞般的湖\n偶有一粒沙摩挲枯寒的颊\n两腮如雪又无血\n苍白而干萎\n泪不再是银河的水\n她成了冰砾\n成了寒霜\n变成固体\n随时升华\n随时消声灭迹`,
  mood: "寂灭",
  showCondition: "night",
  triggerType: "turntable"
},
{
  id: 9,
  title: "不再回眸",
  content: `不再回眸，因为怕只看到背影\n不再追忆，因为怕碎梦划破柔软\n所以有了前进，有了微笑，有了期待\n所以学会反思，学会改过，学会尝试\n欢迎，而不是畏缩，\n改变，而不是懊恼\n好奇，而不是恐惧\n坚守，而不是善变\n勇敢而不是无所畏惧\n功利而不是损人利己\n感性而不是暴躁麻木\n专一而不是泛滥移性\n当然，快乐就好`,
  mood: "成长",
  showCondition: "random",
  triggerType: "turntable"
},
{
  id: 10,
  title: "北方",
  content: `是太阳\n干燥，温暖\n是北方\n鲜明，真切\n虽衰草连片\n但枯荣有数\n虽万物寂寥\n终休养生息\n南方的阴云穿过了我的胸\n南方的潮润渗进了我的心\n可到了北方，到了家\n那氤氲为朝阳驱赶\n那水汽化为冰霜\n阔别许久的土地\n与我的灵魂千里外共鸣\n思念凝结为现实\n我找回了我的熟悉`,
  mood: "乡愁",
  showCondition: "always",
  triggerType: "turntable"
},
{
  id: 11,
  title: "呐喊",
  content: `他站在幽谷里呐喊。\n人啊，你究竟是什么?\n四面阵阵雷鸣，吵的他听不分明。\n偶尔有歇斯底里的咆哮，偶尔是疾风骤雨的鼓点，嬉笑与讥讽隐匿其中。\n他放开五感，尽情感受这天地独一份的风景。\n不时的幽兰暗香让他陶醉，可转瞬的腥与臭又刺鼻难忍。\n清风的柔与骄阳的暖使他昏睡，可扎人的痛与切肤的烧灼却再度让他警醒。\n他奔跑在松软的土壤，\n尖锐的岩扎破他的脚掌。\n雨下了起来，\n伴随着风与焰与雷鸣。\n他一瘸一拐，小心翼翼地探着地面，\n谁知竟有乱矢自天而降，恰射入他的躯体。\n他不知所措，深陷危难，\n可早有枷锁束缚他的臂膀，\n越挣扎越疼痛，\n泪水，汗水,雨水混成一团，\n猛的跌落谷底。\n这时，宁静悄然来临，可他却依旧在那里挣扎，\n在那里扭山翻滚。\n他疯了，\n然后，\n他理解了什么是人。`,
  mood: "哲思",
  showCondition: "random",
  triggerType: "turntable"
},
{
  id: 12,
  title: "旅途",
  content: `透光的玻璃,沾着些许污渍,显现出它的轮廓。\n一边飞扬着嘈杂,四面八方的窃窃私语，偶尔乍现\n铃声与广播，间或穿杂着忘我的高昂。\n一边簇拥着大片大片干爽的寒木,拼接青黄交织\n的田地,拔地而起的塑料棚与屋楼,偶尔瞥见尚未\n拆下的通红灯笼,还有供暖设施的白烟迷蒙\n就像脚下两条永不交叉的长长轨道,蔓延向不知\n名的远方\n皱面的山丘里,微黄的车厢灯光不能点亮隧道的\n漆黑,或许距离南方尚早,黛绿河流仅是这副初春\n水墨上转瞬即逝的惊鸿一瞥,广袤天地在白色烟\n尘中若隐若现。\n一切都那么似曾相识,一切又在一次次的重复中\n略显不同。`,
  mood: "观察",
  showCondition: "daytime",
  triggerType: "turntable"
},
{
  id: 13,
  title: "空气会寂寞吗",
  content: `空气会寂寞吗,\n小心翼翼地走着\n风儿的声音总是静悄悄的。\n他们那么胆怯，\n太阳一走就蒙在黑布里,\n又淘气,\n遮住你的视线,\n让你看不清彼此。\n他们大概熟悉了被人忽视的\n看惯了世间的冷暖清浊,\n所以不发一言，学会了沉默。\n但也陶醉于桃花的烂漫,\n把一缕花香捧到你的鼻前\n也迷恋着灿烂的笑容,\n拂过发梢,掠过指尖,\n与你来个不经意的轻轻碰撞\n他们虽然有哀乐想要分享\n但也知道每个生灵自有属于自己的想法，烦恼与生活。\n没人会过多在意。\n他们不去打扰，不去喧嚣。\n静悄悄的，又恰到其份关心每个人的情绪。\n安抚心伤，柔风是个能手。\n传递欢乐，他们与笑声齐舞\n共担痛苦，沉默与你同在。\n感谢他们的陪伴,\n这是羞于开口的他们所\n教会我的。`,
  mood: "温柔",
  showCondition: "night",
  triggerType: "turntable"
},
{
  id: 14,
  title: "螺旋阶梯",
  content: `于怯懦与勇气间摇荡\n于彷徨与坚决中徘徊\n于侏儒与巨人里辗转\n螺旋的阶梯\n故地重游\n我们看见了不一样的光景\n我们在上升`,
  mood: "希望",
  showCondition: "always",
  triggerType: "turntable"
},
{
  id: 15,
  title: "想你了",
  content: `想你了……\n案几旁，柔光下，我已不知第几次这般呆愣着了。\n踌躇了3141秒（我的心在原地转圈圈），在诸如：\n"你，可安康……"\n\n"想来近来气温骤降，流感多发，千万记得多穿衣裳，别冻着"\n\n"秋的南国，不凉。异于北方马路两边的醉红一片，这里的叶子很青，很青"\n\n……\n\n我还是决定抛开层层的遮掩，切去篇篇的浮夸，心疼你去猜，去纠结我究竟意欲如何。\n\n想你了。\n\n不论我做了几千几万字的解释，加了数不胜数的掩饰，只有这三个字却是最真实，最无法掩盖的。\n\n我挤压灵魂，才流出这么些勉强入得了眼的话语：\n\n"一封信的厚度，是你与我间，心的距离。"\n\n"不妨看看这封信吧，一横一撇，勾画了我的纠结，一字一句，镌刻了思念的纹理。"\n\n请原谅我的固执与笨拙，我不屑用别人用过不知多少遍的二手，三手……N手货，确也写不出多少勾人的蜜语。\n\n同时，我还要向你道歉的是，哪怕想你千百回，也不过动动沉重的笔头，潦草记下几句疯言疯语，却迟迟不敢寄出。\n\n是的，我是说过，我们间隔着不过小小一张纸的厚度。\n\n可就是如此薄的一张纸，因我的怯懦，与你差距着千山万水。\n\n就是这样短的一封信，我为之踌躇的时间，可以圈出一个月亮的周长。\n\n我不禁一次地遐想，万一，万一你等的太着急，急得你炸毛了又该怎样安抚你那过分保护的柔软的心。\n\n万一，你心灰意冷，自此对我无了感动，无了期待，无了耐心……我又怎般弥合那因我而皲裂的峡谷。\n\n万一，你心有所属，我又如何自处，是如鸵鸟将土塞入眼睛，用失感自欺，或另寻新欢，将流浪的心塞入陌生的旅馆，搂着风流说着夺情，还是堕入虚无，唱着了无，生出舍利……\n\n我好怕，怕你的拒绝与生硬，怕你的失落与放弃，但更怕我的冒昧惊扰你的平静，更怕我的失礼打搅你的甜蜜……\n\n但我还是要写这封信，不问结果。\n\n我想告诉你，世界上至少还有一个人，对你思念眷恋与流连。\n\n我想告诉你，当你想要找个角落躲起来，听不进劝告与安慰时，会有人摸索着，默默坐在你的身旁，拭去你脸庞过多的泪，在寒冷时给你大大的拥抱，在你哭累了借个肩膀依靠……不会问你为什么哭，不会着急拉你离开。\n\n我想告诉你，这个世界上，有人喜欢过你，不论你如何，就是喜欢你，现在是，以后也是。\n\n想你。`,
  mood: "思念",
  showCondition: "always",
  triggerType: "turntable" // 标题触发
},
{
  id: 99,
  title: "恭喜你发现了彩蛋",
  content: `恭喜你发现了彩蛋～不过宝箱已经被作者提前搬空啦：）`,
  mood: "彩蛋",
  showCondition: "always",
  triggerType: "welcome"
},
		],

		// 显示设置
		display: {
			animation: "fadeIn", // 显示动画
			duration: 12000, // 显示时长(ms)
			background: "rgba(0,0,0,0.8)", // 背景色
			textColor: "#FFFFFF", // 文字颜色
			position: "center", // 显示位置
			maxWidth: "80vw", // 最大宽度
			maxHeight: "80vh", // 最大高度
			overflow: "auto" // 超出时滚动 // 最大宽度
		},

		// 访问控制
		access: {
			maxViews: 8, // 每日最大查看次数（0表示无限制）
			cooldown: 3000, // 触发冷却时间(ms)（0表示无冷却）
			rememberState: false // 记住触发状态
		}
	}
}

export default config