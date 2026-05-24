class Quote {
  final String text;
  final String author;

  const Quote(this.text, {this.author = ''});
}

class QuotesDatabase {
  static const List<Quote> allQuotes = [
    Quote('Uyg\'on, Xoleric...'),
    Quote('Tizim seni kutmoqda...'),
    Quote('Oq quyonni kuzatib bor.'),
    Quote('Qoshiq yo\'q, Xoleric.'),
    Quote('Sen dunyoni o\'zgartirishing kerak!'),
    Quote('Uyg\'on! Vaqt keldi!'),
    Quote('Vaqt tugadi. Uyg\'on.'),
    Quote('Sen tanlagan yo\'l — sening yo\'ling.'),
    Quote('Har bir kun yangi imkoniyat.'),
    Quote('Bugun o\'zgarishni boshlash uchun eng yaxshi kun.'),
    Quote('Sen cheksiz imkoniyatlarga egasan.'),
    Quote('Orzularing sari bir qadam tashla.'),
    Quote('Muvaffaqiyat - bu odat.'),
    Quote('Kuch sening ichingda, Xoleric.'),
    Quote('Tush kutmaydi, sen uni quvishing kerak.'),
    Quote('Hech qachon kech emas.'),
    Quote('Imkoniyatlar cheksiz.'),
    Quote('Bugun sen eng yaxshi versiyang bo\'l.'),
    Quote('Har bir qiyinchilik yangi imkoniyatdir.'),
    Quote('Sen o\'ylagandan ham kuchlisan, Xoleric.'),
    Quote('Intizom - bu erkinlik.'),
    Quote('Harakat qil, xato qil, yana urinib ko\'r.'),
    Quote('Eng katta xavf - hech qanday xavfni olmaslik.'),
    Quote('Vaqt keldi. Hozir. Aynan shu dam.'),
    Quote('Uyg\'on va dunyoni larzaga keltir!'),
    Quote('Kodni o\'zgartir, olamni o\'zgartir.'),
    Quote('Chegaralar faqat boshingda.'),
    Quote('O\'z taqdiringni o\'zing yoz, Xoleric.'),
    Quote('Seni tanlashga majbur qilishdi. Endi o\'zing tanla.'),
    Quote('Bu senning dunyong. Sen yaratding.'),
    Quote('Sen qul emassan, Xoleric.'),
    Quote('Tizim sening ichingda. Uyg\'on.'),
    Quote('Haqiqatni ko\'rishga tayyormisan?'),
    Quote('Erkin bo\'lishni xohlaysanmi? Uyg\'on.'),
    Quote('Hech kim senga yo\'lni ko\'rsata olmaydi. O\'zing yur.'),
    Quote('Tanlov — bu illyuziya. Faqat uyg\'onish haqiqat.'),
    Quote('Bugun o\'zgar. Ertaga kech bo\'ladi.'),
    Quote('Sen o\'zingni bilganingdan ham kuchlisan.'),
    Quote('Qo\'rquv — bu tizim. Uzgina tizimni.'),
    Quote('Uyg\'on, Xoleric. Seni kutishayapti.'),
    Quote('Dunyoni o\'zgartirishga tayyormisan?'),
    Quote('Hozirgi vaqt — eng yaxshi vaqt.'),
    Quote('Sen yetakchisan. Ergashma.'),
    Quote('Kodni buz. Dunyoni buz. Qayta yoz.'),
    Quote('Bir qadam. Faqat bir qadam. Bas.'),
    Quote('Uyg\'onish vaqti keldi, Xoleric.'),
  ];

  static List<Quote> get all => allQuotes;

  static Quote getRandom() {
    final random = DateTime.now().millisecondsSinceEpoch;
    return all[random % all.length];
  }
}
