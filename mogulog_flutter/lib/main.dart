import 'dart:math';
import 'dart:io';
import 'package:flutter/material.dart';
// ※実機リリースの際は pubspec.yaml に image_picker と url_launcher を追加してください
// import 'package:image_picker/image_picker.dart'; 

void main() {
  runApp(const MoguLogApp());
}

class MoguLogApp extends StatelessWidget {
  const MoguLogApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'もぐログ',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: const Color(0xFFFF6F61), // シズル感のあるサーモンピンク
        scaffoldBackgroundColor: const Color(0xFF121214), // ダークでプレミアムな背景
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFFFF6F61),
          secondary: Color(0xFFFFB347),
          surface: Color(0xFF1E1E24),
          background: Color(0xFF121214),
        ),
        fontFamily: 'Outfit',
      ),
      home: const MainNavigationScreen(),
    );
  }
}

// ==========================================
// 1. データモデル
// ==========================================
class FoodCard {
  final String id;
  final String imageUrl; // Web用/ダミー用URL
  final File? localImageFile; // 端末カメラ/ギャラリーから取得した画像ファイル
  final String title;
  final String comment;
  final String shopName;
  final String area; // 梅田, 難波 など
  final String genre; // ラーメン, カフェ, 寿司 など
  final double latitude;
  final double longitude;
  final bool isLimited; // 期間限定・数量限定フラグ
  bool isUnlocked; // 「行きたい！」で裏面がアンロックされたか
  bool isMyCard; // 自分が作成したカードか

  FoodCard({
    required this.id,
    required this.imageUrl,
    this.localImageFile,
    required this.title,
    required this.comment,
    required this.shopName,
    required this.area,
    required this.genre,
    required this.latitude,
    required this.longitude,
    required this.isLimited,
    this.isUnlocked = false,
    this.isMyCard = false,
  });
}

// ==========================================
// 2. 状態管理（簡易的なインメモリState）
// ==========================================
class AppStateManager extends ChangeNotifier {
  static final AppStateManager _instance = AppStateManager._internal();
  factory AppStateManager() => _instance;
  AppStateManager._internal();

  final List<FoodCard> _cards = [
    FoodCard(
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=60',
      title: '極濃魚介豚骨そば',
      comment: 'スープにとろみがあって麺によく絡む！チャーシューがとろけました。🍜',
      shopName: '麺屋 むぎわら',
      area: '梅田',
      genre: 'ラーメン',
      latitude: 34.702485,
      longitude: 135.495951,
      isLimited: false,
      isUnlocked: false,
    ),
    FoodCard(
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&auto=format&fit=crop&q=60',
      title: '極厚ふわとろスフレパンケーキ',
      comment: '口に入れた瞬間になくなる！メープルシロップとの相性が最高です。🥞',
      shopName: 'Cafe de Float',
      area: '難波',
      genre: 'カフェ',
      latitude: 34.6662,
      longitude: 135.5022,
      isLimited: true,
      isUnlocked: true,
    ),
    FoodCard(
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&auto=format&fit=crop&q=60',
      title: '極上本マグロ大トロ握り',
      comment: '脂が上品で口の中でふわっと広がります。職人さんの技が光る一品。🍣',
      shopName: '鮨処 すずき',
      area: '梅田',
      genre: '寿司',
      latitude: 34.7011,
      longitude: 135.4965,
      isLimited: false,
      isUnlocked: false,
    ),
  ];

  List<FoodCard> get cards => _cards;

  void addCard(FoodCard card) {
    _cards.insert(0, card);
    notifyListeners();
  }

  void unlockCard(String id) {
    final index = _cards.indexWhere((c) => c.id == id);
    if (index != -1) {
      _cards[index].isUnlocked = true;
      notifyListeners();
    }
  }
}

// ==========================================
// 3. メインナビゲーション
// ==========================================
class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({Key? key}) : super(key: key);

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;
  final AppStateManager _stateManager = AppStateManager();

  @override
  void initState() {
    super.initState();
    _stateManager.addListener(_onStateChanged);
  }

  @override
  void dispose() {
    _stateManager.removeListener(_onStateChanged);
    super.dispose();
  }

  void _onStateChanged() {
    if (mounted) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final List<Widget> screens = [
      TimelineScreen(cards: _stateManager.cards, onUnlock: _stateManager.unlockCard),
      CollectionScreen(cards: _stateManager.cards, onUnlock: _stateManager.unlockCard),
      MapScreen(cards: _stateManager.cards),
    ];

    return Scaffold(
      body: SafeArea(
        child: IndexedStack(
          index: _currentIndex,
          children: screens,
        ),
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          border: Border(
            top: BorderSide(color: Colors.white.withOpacity(0.08), width: 1),
          ),
        ),
        child: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: (index) {
            setState(() {
              _currentIndex = index;
            });
          },
          backgroundColor: const Color(0xFF1E1E24),
          selectedItemColor: Theme.of(context).primaryColor,
          unselectedItemColor: Colors.white60,
          showSelectedLabels: true,
          showUnselectedLabels: true,
          type: BottomNavigationBarType.fixed,
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.style),
              label: 'タイムライン',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.collections_bookmark),
              label: 'マイ図鑑',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.map),
              label: 'マイマップ',
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showPostDialog(context),
        backgroundColor: Theme.of(context).primaryColor,
        child: const Icon(Icons.add_a_photo, color: Colors.white),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }

  void _showPostDialog(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => const PostBottomSheet(),
    );
  }
}

// ==========================================
// 投稿ボトムシート（画像ピッカーシミュレーション統合）
// ==========================================
class PostBottomSheet extends StatefulWidget {
  const PostBottomSheet({Key? key}) : super(key: key);

  @override
  State<PostBottomSheet> createState() => _PostBottomSheetState();
}

class _PostBottomSheetState extends State<PostBottomSheet> {
  final _commentController = TextEditingController();
  final _titleController = TextEditingController();
  final _shopController = TextEditingController();
  
  String _selectedGenre = 'ラーメン';
  String _selectedArea = '梅田';
  bool _isLimited = false;
  bool _sizzleEnabled = true;
  String? _errorMessage;

  File? _imageFile; // 選択されたローカル画像
  String _selectedDummyImage = 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=60';

  // ネガティブ禁止ワードの定義
  final List<String> _negativeWords = [
    '不味い', 'まずい', 'マズい',
    '遅い', 'おそい', 'オソい',
    '高い', 'たかい', 'タカい',
    '最悪', 'まずかっ', '汚い',
    'うるさい', 'サービス悪い', '二度と行かない'
  ];

  // 画像取得シミュレータ（実際は image_picker パッケージを使用）
  Future<void> _pickImage(bool fromCamera) async {
    // 【本番実装用のコード参考】
    // final picker = ImagePicker();
    // final pickedFile = await picker.pickImage(
    //   source: fromCamera ? ImageSource.camera : ImageSource.gallery,
    //   imageQuality: 85,
    // );
    // if (pickedFile != null) {
    //   setState(() {
    //     _imageFile = File(pickedFile.path);
    //   });
    // }

    // プロトタイプ用のダミーシミュレーション
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(fromCamera ? '📷 スマホのカメラを起動しました（プロトタイプ）' : '🖼️ 写真ライブラリを開きました（プロトタイプ）'),
        duration: const Duration(seconds: 1),
      ),
    );
    
    setState(() {
      // ラーメン、パンケーキ、寿司からランダムでダミー取得
      final dummyPresets = [
        'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&auto=format&fit=crop&q=60',
      ];
      _selectedDummyImage = dummyPresets[Random().nextInt(dummyPresets.length)];
      // _imageFile = File('dummy_path'); // シミュレート用
    });
  }

  bool _validateComment(String text) {
    for (var word in _negativeWords) {
      if (text.contains(word)) {
        return false;
      }
    }
    return true;
  }

  void _submit() {
    final comment = _commentController.text.trim();
    final title = _titleController.text.trim();
    final shop = _shopController.text.trim();

    if (title.isEmpty || comment.isEmpty || shop.isEmpty) {
      setState(() {
        _errorMessage = 'すべての項目を入力してください。';
      });
      return;
    }

    if (!_validateComment(comment)) {
      setState(() {
        _errorMessage = '「もっと美味しい表現で伝えてみませんか？✨」\n(もぐログはポジティブな食体験のみを共有する場所です)';
      });
      return;
    }

    // ダミーの緯度経度（エリア別）
    double lat = 34.702485;
    double lng = 135.495951;
    if (_selectedArea == '難波') {
      lat = 34.6662 + (Random().nextDouble() - 0.5) * 0.01;
      lng = 135.5022 + (Random().nextDouble() - 0.5) * 0.01;
    } else {
      lat = 34.7011 + (Random().nextDouble() - 0.5) * 0.01;
      lng = 135.4965 + (Random().nextDouble() - 0.5) * 0.01;
    }

    final newCard = FoodCard(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      imageUrl: _selectedDummyImage,
      localImageFile: _imageFile,
      title: title,
      comment: comment,
      shopName: shop,
      area: _selectedArea,
      genre: _selectedGenre,
      latitude: lat,
      longitude: lng,
      isLimited: _isLimited,
      isUnlocked: true,
      isMyCard: true,
    );

    AppStateManager().addCard(newCard);
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: Color(0xFF1E1E24),
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(24),
          topRight: Radius.circular(24),
        ),
      ),
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom + 20,
        left: 20,
        right: 20,
        top: 20,
      ),
      child: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Center(
              child: Container(width: 50, height: 5, decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(10))),
            ),
            const SizedBox(height: 15),
            const Text(
              '美味しい瞬間をカードにする 📸',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),
            
            // 画像選択プレビュー領域
            Stack(
              alignment: Alignment.center,
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: ColorFiltered(
                    colorFilter: _sizzleEnabled
                        ? const ColorFilter.matrix(<double>[
                            1.25, 0.0, 0.0, 0.0, 15,
                            0.0, 1.25, 0.0, 0.0, 15,
                            0.0, 0.0, 1.25, 0.0, 15,
                            0.0, 0.0, 0.0, 1.0, 0,
                          ])
                        : const ColorFilter.mode(Colors.transparent, BlendMode.dst),
                    child: _imageFile != null
                        ? Image.file(_imageFile!, height: 180, width: double.infinity, fit: BoxFit.cover)
                        : Image.network(_selectedDummyImage, height: 180, width: double.infinity, fit: BoxFit.cover),
                  ),
                ),
                if (_sizzleEnabled)
                  Positioned.fill(
                    child: IgnorePointer(
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(16),
                        child: SizzleOverlayWidget(isLimited: _isLimited),
                      ),
                    ),
                  ),
                Positioned(
                  top: 10,
                  right: 10,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                    decoration: BoxDecoration(color: Colors.black.withOpacity(0.6), borderRadius: BorderRadius.circular(20)),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(Icons.auto_awesome, color: Colors.amber, size: 16),
                        const SizedBox(width: 5),
                        Text(_sizzleEnabled ? 'AIシズル加工 ON' : 'AI加工 OFF', style: const TextStyle(fontSize: 12, color: Colors.white)),
                      ],
                    ),
                  ),
                )
              ],
            ),
            const SizedBox(height: 12),
            
            // カメラ・写真ロール呼び出しボタン
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () => _pickImage(true),
                    icon: const Icon(Icons.camera_alt, color: Colors.white),
                    label: const Text('写真を撮影', style: TextStyle(color: Colors.white)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white12,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () => _pickImage(false),
                    icon: const Icon(Icons.photo_library, color: Colors.white),
                    label: const Text('アルバムから選択', style: TextStyle(color: Colors.white)),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white12,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      padding: const EdgeInsets.symmetric(vertical: 12),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('AIシズル感加工を適用する'),
                Switch(value: _sizzleEnabled, onChanged: (val) => setState(() => _sizzleEnabled = val), activeColor: Theme.of(context).primaryColor)
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Row(
                  children: [
                    Icon(Icons.stars, color: Colors.amber, size: 20),
                    SizedBox(width: 5),
                    Text('期間限定・数量限定 (限定フレーム)'),
                  ],
                ),
                Checkbox(value: _isLimited, onChanged: (val) => setState(() => _isLimited = val ?? false), activeColor: Theme.of(context).primaryColor)
              ],
            ),
            const Divider(color: Colors.white10),
            TextField(controller: _titleController, decoration: const InputDecoration(labelText: '料理名 (例: 特製醤油つけ麺)', border: InputBorder.none)),
            TextField(controller: _shopController, decoration: const InputDecoration(labelText: '店舗名 (例: ラーメン極み)', border: InputBorder.none)),
            Row(
              children: [
                Expanded(
                  child: DropdownButtonFormField<String>(
                    value: _selectedGenre,
                    decoration: const InputDecoration(labelText: 'ジャンル', border: InputBorder.none),
                    items: ['ラーメン', 'カフェ', '寿司', '洋食', 'カレー']
                        .map((genre) => DropdownMenuItem(value: genre, child: Text(genre)))
                        .toList(),
                    onChanged: (val) => setState(() => _selectedGenre = val!),
                  ),
                ),
                const SizedBox(width: 20),
                Expanded(
                  child: DropdownButtonFormField<String>(
                    value: _selectedArea,
                    decoration: const InputDecoration(labelText: 'エリア', border: InputBorder.none),
                    items: ['梅田', '難波', '心斎橋', '天王寺']
                        .map((area) => DropdownMenuItem(value: area, child: Text(area)))
                        .toList(),
                    onChanged: (val) => setState(() => _selectedArea = val!),
                  ),
                ),
              ],
            ),
            TextField(
              controller: _commentController,
              maxLines: 2,
              decoration: const InputDecoration(
                labelText: '美味しい一言コメント (※ポジティブ限定)',
                hintText: '例: 麺のもちもち感とスープの相性がバツグンでした！',
                border: InputBorder.none,
              ),
            ),
            if (_errorMessage != null) ...[
              const SizedBox(height: 10),
              Text(_errorMessage!, style: const TextStyle(color: Colors.redAccent, fontSize: 13, fontWeight: FontWeight.bold), textAlign: TextAlign.center),
            ],
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _submit,
              style: ElevatedButton.styleFrom(
                backgroundColor: Theme.of(context).primaryColor,
                padding: const EdgeInsets.symmetric(vertical: 15),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              child: const Text('カードを生成して投稿する', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
            ),
          ],
        ),
      ),
    );
  }
}

// ==========================================
// 4. 湯気・キラキラエフェクトの描画 (CustomPainter)
// ==========================================
class SizzleOverlayWidget extends StatefulWidget {
  final bool isLimited;
  const SizzleOverlayWidget({Key? key, required this.isLimited}) : super(key: key);

  @override
  State<SizzleOverlayWidget> createState() => _SizzleOverlayWidgetState();
}

class _SizzleOverlayWidgetState extends State<SizzleOverlayWidget> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 4))..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Stack(
          children: [
            Positioned.fill(child: CustomPaint(painter: SteamPainter(_controller.value))),
            if (widget.isLimited)
              Positioned.fill(child: CustomPaint(painter: GlitterPainter(_controller.value))),
          ],
        );
      },
    );
  }
}

class SteamPainter extends CustomPainter {
  final double animationValue;
  SteamPainter(this.animationValue);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..style = PaintingStyle.fill..maskFilter = const MaskFilter.blur(BlurStyle.normal, 12);
    for (int i = 0; i < 3; i++) {
      final double xFraction = 0.3 + (i * 0.2);
      final double progress = (animationValue + (i * 0.33)) % 1.0;
      final double opacity = 0.09 * (1.0 - progress);
      paint.color = Colors.white.withOpacity(opacity);
      final double yPos = size.height * 0.9 - (size.height * 0.7 * progress);
      final double waveX = size.width * xFraction + 12 * sin(progress * pi * 3);
      final double width = 24.0 + 16.0 * sin(progress * pi);

      canvas.drawOval(Rect.fromCenter(center: Offset(waveX, yPos), width: width, height: width * 2.2), paint);
    }
  }

  @override
  bool shouldRepaint(covariant SteamPainter oldDelegate) => oldDelegate.animationValue != animationValue;
}

class GlitterPainter extends CustomPainter {
  final double animationValue;
  GlitterPainter(this.animationValue);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..style = PaintingStyle.fill;
    final List<Offset> positions = const [
      Offset(0.15, 0.25), Offset(0.85, 0.15),
      Offset(0.2, 0.75), Offset(0.8, 0.65),
      Offset(0.5, 0.3), Offset(0.35, 0.5)
    ];

    for (int i = 0; i < positions.length; i++) {
      final baseOffset = positions[i];
      final double itemProgress = (animationValue + (i * 0.15)) % 1.0;
      final double opacity = sin(itemProgress * pi);
      final double sizeFactor = 3.0 + 4.0 * sin(itemProgress * pi);

      paint.color = Colors.white.withOpacity(opacity * 0.7);
      final double px = size.width * baseOffset.dx;
      final double py = size.height * baseOffset.dy;

      final path = Path();
      path.moveTo(px, py - sizeFactor);
      path.quadraticBezierTo(px, py, px + sizeFactor, py);
      path.quadraticBezierTo(px, py, px, py + sizeFactor);
      path.quadraticBezierTo(px, py, px - sizeFactor, py);
      path.quadraticBezierTo(px, py, px, py - sizeFactor);
      canvas.drawPath(path, paint);
    }
  }

  @override
  bool shouldRepaint(covariant GlitterPainter oldDelegate) => oldDelegate.animationValue != animationValue;
}

// ==========================================
// タイムライン画面
// ==========================================
class TimelineScreen extends StatelessWidget {
  final List<FoodCard> cards;
  final Function(String) onUnlock;

  const TimelineScreen({Key? key, required this.cards, required this.onUnlock}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CustomScrollView(
      slivers: [
        SliverAppBar(
          title: const Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.restaurant, color: Color(0xFFFF6F61)),
              SizedBox(width: 8),
              Text('もぐログ', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24, letterSpacing: 1.2)),
            ],
          ),
          centerTitle: true,
          backgroundColor: const Color(0xFF121214),
          floating: true,
          elevation: 0,
        ),
        SliverPadding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 10),
          sliver: SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) => TimelineCardItem(card: cards[index], onUnlock: onUnlock),
              childCount: cards.length,
            ),
          ),
        ),
      ],
    );
  }
}

// ==========================================
// フリップ対応カードコンポーネント (店舗名表示追加)
// ==========================================
class TimelineCardItem extends StatefulWidget {
  final FoodCard card;
  final Function(String) onUnlock;
  final bool startFlipped; // 図鑑からのポップアップ時に裏側から始める等の拡張用

  const TimelineCardItem({
    Key? key,
    required this.card,
    required this.onUnlock,
    this.startFlipped = false,
  }) : super(key: key);

  @override
  State<TimelineCardItem> createState() => _TimelineCardItemState();
}

class _TimelineCardItemState extends State<TimelineCardItem> with SingleTickerProviderStateMixin {
  late AnimationController _flipController;
  late Animation<double> _flipAnimation;
  bool _showBack = false;

  @override
  void initState() {
    super.initState();
    _flipController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 600),
      value: widget.startFlipped ? 1.0 : 0.0,
    );
    _flipAnimation = TweenSequence<double>([
      TweenSequenceItem(tween: Tween(begin: 0.0, end: pi / 2), weight: 50.0),
      TweenSequenceItem(tween: Tween(begin: pi / 2, end: pi), weight: 50.0),
    ]).animate(_flipController);

    _flipAnimation.addListener(() {
      setState(() {
        _showBack = _flipController.value >= 0.5;
      });
    });
    _showBack = widget.startFlipped;
  }

  @override
  void dispose() {
    _flipController.dispose();
    super.dispose();
  }

  void _toggleFlip() {
    if (!widget.card.isUnlocked && !widget.card.isMyCard) {
      widget.onUnlock(widget.card.id);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Row(
            children: [
              const Icon(Icons.lock_open, color: Colors.amber),
              const SizedBox(width: 10),
              Text('${widget.card.shopName} の情報がアンロックされました！🗝️'),
            ],
          ),
          backgroundColor: const Color(0xFF1E1E24),
          duration: const Duration(seconds: 2),
        ),
      );
    }

    if (_flipController.status == AnimationStatus.completed) {
      _flipController.reverse();
    } else {
      _flipController.forward();
    }
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _flipAnimation,
      builder: (context, child) {
        final transform = Matrix4.identity()
          ..setEntry(3, 2, 0.001)
          ..rotateY(_flipAnimation.value);

        return Transform(
          transform: transform,
          alignment: Alignment.center,
          child: GestureDetector(
            onTap: _toggleFlip,
            child: SizedBox(
              height: 380,
              child: _showBack
                  ? Transform(
                      transform: Matrix4.identity()..rotateY(pi),
                      alignment: Alignment.center,
                      child: _buildCardBack(),
                    )
                  : _buildCardFront(),
            ),
          ),
        );
      },
    );
  }

  // カード表面（店舗名「shopName」をオーバーレイで画像に表示）
  Widget _buildCardFront() {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E24),
        borderRadius: BorderRadius.circular(20),
        border: widget.card.isLimited
            ? Border.all(color: const Color(0xFFFFD700), width: 3)
            : Border.all(color: Colors.white.withOpacity(0.08), width: 1),
        boxShadow: [
          BoxShadow(color: widget.card.isLimited ? const Color(0xFFFFD700).withOpacity(0.2) : Colors.black45, blurRadius: 10, offset: const Offset(0, 5)),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(19),
        child: Stack(
          children: [
            Positioned.fill(
              bottom: 110,
              child: Stack(
                fit: StackFit.expand,
                children: [
                  ColorFiltered(
                    colorFilter: const ColorFilter.matrix(<double>[
                      1.25, 0.0, 0.0, 0.0, 15,
                      0.0, 1.25, 0.0, 0.0, 15,
                      0.0, 0.0, 1.25, 0.0, 15,
                      0.0, 0.0, 0.0, 1.0, 0,
                    ]),
                    child: widget.card.localImageFile != null
                        ? Image.file(widget.card.localImageFile!, fit: BoxFit.cover)
                        : Image.network(widget.card.imageUrl, fit: BoxFit.cover),
                  ),
                  Positioned.fill(child: SizzleOverlayWidget(isLimited: widget.card.isLimited)),
                  
                  // 【店舗名表示追加！】：画像の右上にお店タグを表示
                  Positioned(
                    top: 15,
                    right: 15,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                      decoration: BoxDecoration(
                        color: Colors.black.withOpacity(0.7),
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: Colors.white24, width: 0.5),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(Icons.store, color: Color(0xFFFF6F61), size: 12),
                          const SizedBox(width: 4),
                          Text(
                            widget.card.shopName,
                            style: const TextStyle(fontSize: 11, color: Colors.white, fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                    ),
                  ),

                  if (widget.card.isLimited)
                    Positioned(
                      top: 15,
                      left: 15,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(color: const Color(0xFFFFD700), borderRadius: BorderRadius.circular(10)),
                        child: const Row(
                          children: [
                            Icon(Icons.stars, color: Color(0xFF1E1E24), size: 14),
                            SizedBox(width: 4),
                            Text('LIMITED CARD', style: TextStyle(color: Color(0xFF1E1E24), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5)),
                          ],
                        ),
                      ),
                    ),
                  Positioned(
                    bottom: 10,
                    left: 10,
                    right: 10,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      decoration: BoxDecoration(color: Colors.black.withOpacity(0.7), borderRadius: BorderRadius.circular(12)),
                      child: Text('💬「${widget.card.comment}」', style: const TextStyle(color: Colors.white, fontSize: 13, height: 1.3), maxLines: 2, overflow: TextOverflow.ellipsis),
                    ),
                  ),
                ],
              ),
            ),
            Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              height: 110,
              child: Container(
                color: const Color(0xFF1E1E24),
                padding: const EdgeInsets.all(15),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(widget.card.title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white), overflow: TextOverflow.ellipsis),
                          const SizedBox(height: 5),
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                decoration: BoxDecoration(color: Colors.white.withOpacity(0.1), borderRadius: BorderRadius.circular(6)),
                                child: Text(widget.card.genre, style: const TextStyle(fontSize: 11, color: Colors.white70)),
                              ),
                              const SizedBox(width: 8),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                decoration: BoxDecoration(color: Colors.white.withOpacity(0.1), borderRadius: BorderRadius.circular(6)),
                                child: Text(widget.card.area, style: const TextStyle(fontSize: 11, color: Colors.white70)),
                              ),
                            ],
                          )
                        ],
                      ),
                    ),
                    const SizedBox(width: 10),
                    (widget.card.isUnlocked || widget.card.isMyCard)
                        ? Container(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                            decoration: BoxDecoration(color: Colors.white.withOpacity(0.08), borderRadius: BorderRadius.circular(12)),
                            child: const Row(
                              children: [
                                Icon(Icons.check, color: Color(0xFFFF6F61), size: 18),
                                SizedBox(width: 5),
                                Text('Want!', style: TextStyle(color: Color(0xFFFF6F61), fontWeight: FontWeight.bold, fontSize: 13)),
                              ],
                            ),
                          )
                        : ElevatedButton.icon(
                            onPressed: _toggleFlip,
                            icon: const Icon(Icons.lock, color: Colors.white, size: 14),
                            label: const Text('行きたい！', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.white)),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Theme.of(context).primaryColor,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                            ),
                          ),
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }

  // カード裏面
  Widget _buildCardBack() {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF282830),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Theme.of(context).primaryColor.withOpacity(0.5), width: 1),
        boxShadow: const [BoxShadow(color: Colors.black45, blurRadius: 10, offset: Offset(0, 5))],
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Row(
                children: [
                  Icon(Icons.lock_open, color: Colors.amber, size: 18),
                  SizedBox(width: 8),
                  Text('店舗詳細 (アンロック済)', style: TextStyle(color: Colors.amber, fontWeight: FontWeight.bold, fontSize: 12)),
                ],
              ),
              IconButton(icon: const Icon(Icons.close, color: Colors.white60, size: 20), onPressed: _toggleFlip, padding: EdgeInsets.zero, constraints: const BoxConstraints()),
            ],
          ),
          const SizedBox(height: 20),
          Text(widget.card.shopName, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
          const SizedBox(height: 10),
          Row(
            children: [
              const Icon(Icons.place, color: Color(0xFFFF6F61), size: 16),
              const SizedBox(width: 5),
              Text('エリア: ${widget.card.area} 地区', style: const TextStyle(color: Colors.white70)),
            ],
          ),
          const SizedBox(height: 20),
          const Text('Google Maps Location:', style: TextStyle(color: Colors.white38, fontSize: 12)),
          const SizedBox(height: 5),
          Expanded(
            child: Container(
              decoration: BoxDecoration(borderRadius: BorderRadius.circular(12), color: const Color(0xFF1E1E24), border: Border.all(color: Colors.white10)),
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Positioned.fill(
                    child: Opacity(
                      opacity: 0.4,
                      child: Image.network('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=60', fit: BoxFit.cover),
                    ),
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.location_on, color: Color(0xFFFF6F61), size: 36),
                      const SizedBox(height: 8),
                      Text('緯度: ${widget.card.latitude.toStringAsFixed(4)}\n経度: ${widget.card.longitude.toStringAsFixed(4)}', textAlign: TextAlign.center, style: const TextStyle(fontSize: 11, color: Colors.white)),
                    ],
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 15),
          ElevatedButton.icon(
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('外部Google Mapsアプリを起動します...🗺️')));
            },
            icon: const Icon(Icons.open_in_new, color: Colors.white, size: 16),
            label: const Text('Google Mapsで開く', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF4285F4), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)), padding: const EdgeInsets.symmetric(vertical: 12)),
          ),
        ],
      ),
    );
  }
}

// ==========================================
// マイ図鑑画面 (カードタップ時詳細フリップダイアログ統合)
// ==========================================
class CollectionScreen extends StatefulWidget {
  final List<FoodCard> cards;
  final Function(String) onUnlock;

  const CollectionScreen({Key? key, required this.cards, required this.onUnlock}) : super(key: key);

  @override
  State<CollectionScreen> createState() => _CollectionScreenState();
}

class _CollectionScreenState extends State<CollectionScreen> {
  String _currentViewMode = 'area'; // area or genre

  // 図鑑から詳細フリップカードをモーダル表示する関数
  void _showDetailFlipDialog(BuildContext context, FoodCard card) {
    showDialog(
      context: context,
      barrierColor: Colors.black87, // 暗い背景
      builder: (BuildContext context) {
        return Dialog(
          backgroundColor: Colors.transparent,
          insetPadding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Align(
                alignment: Alignment.right,
                child: IconButton(
                  icon: const Icon(Icons.close, color: Colors.white, size: 28),
                  onPressed: () => Navigator.pop(context),
                ),
              ),
              const SizedBox(height: 10),
              // ダイアログ内に3Dフリップカードを配置
              TimelineCardItem(
                card: card,
                onUnlock: widget.onUnlock,
                startFlipped: true, // タップしたら店舗詳細情報（裏面）が先に見える、もしくは両方トグル可能
              ),
              const SizedBox(height: 15),
              const Text(
                'カードをタップすると反転します 🔄',
                style: TextStyle(color: Colors.white54, fontSize: 12),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final collectedCards = widget.cards.where((c) => c.isMyCard || c.isUnlocked).toList();
    final Map<String, List<FoodCard>> areaMap = {};
    final Map<String, List<FoodCard>> genreMap = {};

    for (var card in collectedCards) {
      areaMap.putIfAbsent(card.area, () => []).add(card);
      genreMap.putIfAbsent(card.genre, () => []).add(card);
    }

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('マイコレクション 📂', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
              Container(
                decoration: BoxDecoration(color: Colors.white.withOpacity(0.08), borderRadius: BorderRadius.circular(12)),
                padding: const EdgeInsets.all(4),
                child: Row(
                  children: [
                    _buildSwitchButton('area', 'エリア別'),
                    _buildSwitchButton('genre', 'ジャンル別'),
                  ],
                ),
              ),
            ],
          ),
        ),
        Expanded(
          child: collectedCards.isEmpty
              ? _buildEmptyState()
              : _currentViewMode == 'area'
                  ? _buildCategoryList(areaMap)
                  : _buildCategoryList(genreMap),
        ),
      ],
    );
  }

  Widget _buildSwitchButton(String mode, String label) {
    final isSelected = _currentViewMode == mode;
    return GestureDetector(
      onTap: () => setState(() => _currentViewMode = mode),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(color: isSelected ? Theme.of(context).primaryColor : Colors.transparent, borderRadius: BorderRadius.circular(8)),
        child: Text(label, style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: isSelected ? Colors.white : Colors.white60)),
      ),
    );
  }

  Widget _buildEmptyState() {
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.collections_bookmark_outlined, size: 64, color: Colors.white24),
          SizedBox(height: 16),
          Text('まだカードが集まっていません', style: TextStyle(color: Colors.white38, fontSize: 16)),
          SizedBox(height: 8),
          Text('「行きたい！」を押してアンロックするか、\n自分で写真をカードにしてコレクションしましょう！✨', textAlign: TextAlign.center, style: TextStyle(color: Colors.white24, fontSize: 12)),
        ],
      ),
    );
  }

  Widget _buildCategoryList(Map<String, List<FoodCard>> categoryMap) {
    final categories = categoryMap.keys.toList();
    return ListView.builder(
      itemCount: categories.length,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      itemBuilder: (context, index) {
        final categoryName = categories[index];
        final categoryCards = categoryMap[categoryName]!;

        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 10.0),
              child: Row(
                children: [
                  Container(width: 4, height: 18, decoration: BoxDecoration(color: Theme.of(context).primaryColor, borderRadius: BorderRadius.circular(2),)),
                  const SizedBox(width: 8),
                  Text('$categoryName (${categoryCards.length}枚)', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
                ],
              ),
            ),
            GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3, crossAxisSpacing: 10, mainAxisSpacing: 10, childAspectRatio: 0.72),
              itemCount: categoryCards.length,
              itemBuilder: (context, cardIndex) {
                final card = categoryCards[cardIndex];
                return GestureDetector(
                  // 【挙動変更！】：タイムライン遷移ではなく、その場で3Dフリップ詳細ダイアログを表示
                  onTap: () => _showDetailFlipDialog(context, card),
                  child: Container(
                    decoration: BoxDecoration(
                      color: const Color(0xFF1E1E24),
                      borderRadius: BorderRadius.circular(12),
                      border: card.isLimited ? Border.all(color: const Color(0xFFFFD700), width: 1.5) : Border.all(color: Colors.white.withOpacity(0.05)),
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(11),
                      child: Stack(
                        fit: StackFit.expand,
                        children: [
                          ColorFiltered(
                            colorFilter: const ColorFilter.matrix(<double>[
                              1.25, 0.0, 0.0, 0.0, 15,
                              0.0, 1.25, 0.0, 0.0, 15,
                              0.0, 0.0, 1.25, 0.0, 15,
                              0.0, 0.0, 0.0, 1.0, 0,
                            ]),
                            child: card.localImageFile != null
                                ? Image.file(card.localImageFile!, fit: BoxFit.cover)
                                : Image.network(card.imageUrl, fit: BoxFit.cover),
                          ),
                          Positioned.fill(child: Container(decoration: BoxDecoration(gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [Colors.transparent, Colors.black.withOpacity(0.8)])))),
                          Positioned(
                            bottom: 8,
                            left: 6,
                            right: 6,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(card.title, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.white)),
                                const SizedBox(height: 2),
                                Text(card.shopName, maxLines: 1, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 8, color: Colors.white54)),
                              ],
                            ),
                          ),
                          if (card.isLimited) const Positioned(top: 4, right: 4, child: Icon(Icons.stars, color: Color(0xFFFFD700), size: 14)),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
            const SizedBox(height: 15),
          ],
        );
      },
    );
  }
}

// ==========================================
// グルメ・マイマップ画面（ジャンルソート機能追加）
// ==========================================
class MapScreen extends StatefulWidget {
  final List<FoodCard> cards;

  const MapScreen({Key? key, required this.cards}) : super(key: key);

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  FoodCard? _selectedCard;
  String _selectedGenreFilter = 'All'; // マップ表示ソートフィルターの選択状態

  final List<String> _filterGenres = ['All', 'ラーメン', 'カフェ', '寿司', '洋食', 'カレー'];

  @override
  Widget build(BuildContext context) {
    // 1. アンロック済・または自分作成のカードを抽出
    final unlockedCards = widget.cards.where((c) => c.isMyCard || c.isUnlocked).toList();

    // 2. ジャンル別ソートフィルターの適用
    final mapCards = _selectedGenreFilter == 'All'
        ? unlockedCards
        : unlockedCards.where((c) => c.genre == _selectedGenreFilter).toList();

    return Stack(
      children: [
        // 背景のGoogleマップモック
        Positioned.fill(
          child: Stack(
            fit: StackFit.expand,
            children: [
              Opacity(
                opacity: 0.5,
                child: Image.network('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80', fit: BoxFit.cover),
              ),
              for (var card in mapCards) _buildMapPin(card),
            ],
          ),
        ),
        
        // 上部検索＆ソート用パネル
        Positioned(
          top: 20,
          left: 16,
          right: 16,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // 検索窓
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  color: const Color(0xFF1E1E24).withOpacity(0.9),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.white.withOpacity(0.08)),
                  boxShadow: const [BoxShadow(color: Colors.black26, blurRadius: 10)],
                ),
                child: const Row(
                  children: [
                    Icon(Icons.search, color: Colors.white54),
                    SizedBox(width: 10),
                    Text('アンロックしたお店を探索する...', style: TextStyle(color: Colors.white54, fontSize: 14)),
                  ],
                ),
              ),
              const SizedBox(height: 10),
              
              // 【ソートフィルター追加！】：ジャンル別フィルターチップ
              SizedBox(
                height: 38,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: _filterGenres.length,
                  itemBuilder: (context, index) {
                    final genre = _filterGenres[index];
                    final isSelected = _selectedGenreFilter == genre;
                    return Padding(
                      padding: const EdgeInsets.only(right: 8.0),
                      child: ChoiceChip(
                        label: Text(genre, style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: isSelected ? Colors.white : Colors.white70)),
                        selected: isSelected,
                        selectedColor: Theme.of(context).primaryColor,
                        backgroundColor: const Color(0xFF1E1E24).withOpacity(0.9),
                        onSelected: (bool selected) {
                          setState(() {
                            _selectedGenreFilter = genre;
                            _selectedCard = null; // フィルター切り替え時にポップアップを閉じる
                          });
                        },
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
        
        // ピンタップ時のポップアップカード
        if (_selectedCard != null)
          Positioned(
            bottom: 20,
            left: 16,
            right: 16,
            child: _buildSelectedCardPopup(),
          ),
      ],
    );
  }

  Widget _buildMapPin(FoodCard card) {
    final double normLat = (card.latitude - 34.65) / 0.07;
    final double normLng = (card.longitude - 135.48) / 0.04;
    final double topPercent = (1.0 - normLat.clamp(0.0, 1.0)) * 0.6 + 0.2;
    final double leftPercent = normLng.clamp(0.0, 1.0) * 0.7 + 0.15;
    final isSelected = _selectedCard?.id == card.id;

    return LayoutBuilder(
      builder: (context, constraints) {
        final top = constraints.maxHeight * topPercent;
        final left = constraints.maxWidth * leftPercent;

        return Positioned(
          top: top - 25,
          left: left - 20,
          child: GestureDetector(
            onTap: () => setState(() => _selectedCard = isSelected ? null : card),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: isSelected ? Theme.of(context).primaryColor : const Color(0xFF1E1E24),
                    shape: BoxShape.circle,
                    border: Border.all(color: card.isLimited ? const Color(0xFFFFD700) : Colors.white, width: isSelected ? 3.0 : 1.5),
                    boxShadow: const [BoxShadow(color: Colors.black45, blurRadius: 4)],
                  ),
                  child: ClipOval(
                    child: card.localImageFile != null
                        ? Image.file(card.localImageFile!, fit: BoxFit.cover)
                        : Image.network(card.imageUrl, fit: BoxFit.cover),
                  ),
                ),
                Icon(Icons.arrow_drop_down, color: isSelected ? Theme.of(context).primaryColor : const Color(0xFF1E1E24), size: 20),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildSelectedCardPopup() {
    final card = _selectedCard!;
    return Container(
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: const Color(0xFF1E1E24),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.08)),
        boxShadow: const [BoxShadow(color: Colors.black54, blurRadius: 15)],
      ),
      child: Row(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: card.localImageFile != null
                ? Image.file(card.localImageFile!, width: 80, height: 80, fit: BoxFit.cover)
                : Image.network(card.imageUrl, width: 80, height: 80, fit: BoxFit.cover),
          ),
          const SizedBox(width: 15),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(card.title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16), maxLines: 1, overflow: TextOverflow.ellipsis),
                const SizedBox(height: 4),
                Text(card.shopName, style: const TextStyle(color: Colors.white70, fontSize: 13), maxLines: 1, overflow: TextOverflow.ellipsis),
                const SizedBox(height: 2),
                Text('${card.area} 地区 · ${card.genre}', style: const TextStyle(color: Colors.white38, fontSize: 11)),
              ],
            ),
          ),
          const SizedBox(width: 10),
          Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              IconButton(icon: const Icon(Icons.directions, color: Color(0xFF4285F4), size: 30), onPressed: () => ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('外部Google Mapsアプリを起動します...🗺️')))),
              const Text('ナビ開始', style: TextStyle(color: Colors.white54, fontSize: 9)),
            ],
          ),
        ],
      ),
    );
  }
}
