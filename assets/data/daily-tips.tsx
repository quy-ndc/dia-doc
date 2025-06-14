import { Activity } from "../../lib/icons/Activity"
import { Apple } from "../../lib/icons/Apple"
import { Bed } from "../../lib/icons/Bed"
import { Beer } from "../../lib/icons/Beer"
import { Candy } from "../../lib/icons/Candy"
import { Check } from "../../lib/icons/Check"
import { Cigarette } from "../../lib/icons/Cigarette"
import { Clock } from "../../lib/icons/Clock"
import { Cross } from "../../lib/icons/Cross"
import { CupSoda } from "../../lib/icons/CupSoda"
import { Droplet } from "../../lib/icons/Droplet"
import { Dumbbell } from "../../lib/icons/Dumbbell"
import { Eye } from "../../lib/icons/Eye"
import { Heart } from "../../lib/icons/Heart"
import { LayoutPanelTop } from "../../lib/icons/LayoutPanelTop"
import { ListChecks } from "../../lib/icons/ListChecks"
import { Moon } from "../../lib/icons/Moon"
import { PencilLine } from "../../lib/icons/PencilLine"
import { Pill } from "../../lib/icons/Pill"
import { RockingChair } from "../../lib/icons/RockingChair"
import { Sandwich } from "../../lib/icons/Sandwich"
import { Scale } from "../../lib/icons/Scale"
import { Smile } from "../../lib/icons/Smile"
import { Sparkles } from "../../lib/icons/Sparkles"
import { Sun } from "../../lib/icons/Sun"
import { TabletSmartphone } from "../../lib/icons/TabletSmartphone"
import { TrendingUp } from "../../lib/icons/TrendingUp"
import { User } from "../../lib/icons/User"
import { UtensilsCrossed } from "../../lib/icons/UtensilsCrossed"
import { Weight } from "../../lib/icons/Weight"
import { Wind } from "../../lib/icons/Wind"

export function getRandomDiabeticTip() {
    const randomIndex = Math.floor(Math.random() * diabeticTips.length)
    return diabeticTips[randomIndex]
}

const diabeticTips = [
    {
        id: 1,
        title: "Theo dõi đường huyết thường xuyên",
        icon: <Activity className="text-foreground" size={18} />,
        desc: "Việc kiểm tra đường huyết định kỳ giúp phát hiện sớm các biến động và điều chỉnh chế độ ăn uống, luyện tập hoặc thuốc men một cách hợp lý và kịp thời"
    },
    {
        id: 2,
        title: "Ăn uống cân bằng",
        icon: <Scale className="text-foreground" size={18} />,
        desc: "Hãy ưu tiên bổ sung rau xanh, ngũ cốc nguyên hạt, protein nạc và hạn chế tối đa thực phẩm chứa nhiều đường và tinh bột tinh chế để kiểm soát đường huyết hiệu quả"
    },
    {
        id: 3,
        title: "Chia nhỏ bữa ăn",
        icon: <LayoutPanelTop className="text-foreground" size={18} />,
        desc: "Chia khẩu phần thành 5-6 bữa nhỏ trong ngày giúp duy trì mức đường huyết ổn định, tránh tăng hoặc hạ đường huyết đột ngột sau khi ăn"
    },
    {
        id: 4,
        title: "Tập thể dục đều đặn",
        icon: <Dumbbell className="text-foreground" size={18} />,
        desc: "Thực hiện các hoạt động thể chất như đi bộ, đạp xe, bơi lội hoặc yoga ít nhất 30 phút mỗi ngày để cải thiện sức khỏe và kiểm soát đường huyết"
    },
    {
        id: 5,
        title: "Uống đủ nước",
        icon: <Droplet className="text-foreground" size={18} />,
        desc: "Uống đủ lượng nước giúp cơ thể đào thải đường dư thừa, hỗ trợ chức năng thận và duy trì sự cân bằng chuyển hóa cho người tiểu đường"
    },
    {
        id: 6,
        title: "Hạn chế thức ăn nhanh",
        icon: <Sandwich className="text-foreground" size={18} />,
        desc: "Thức ăn nhanh thường chứa nhiều đường, chất béo bão hòa và muối, dễ làm tăng đường huyết và gây hại cho tim mạch nếu ăn thường xuyên"
    },
    {
        id: 7,
        title: "Kiểm soát căng thẳng",
        icon: <Activity className="text-foreground" size={18} />,
        desc: "Thư giãn bằng thiền, hít thở sâu, hoặc nghe nhạc giúp giảm căng thẳng, từ đó hỗ trợ kiểm soát mức đường huyết hiệu quả hơn cho người tiểu đường"
    },
    {
        id: 8,
        title: "Ngủ đủ giấc",
        icon: <Bed className="text-foreground" size={18} />,
        desc: "Ngủ không đủ giấc có thể làm rối loạn hoạt động của insulin và khiến mức đường huyết tăng cao, ảnh hưởng đến quá trình kiểm soát bệnh tiểu đường"
    },
    {
        id: 9,
        title: "Kiểm tra mắt định kỳ",
        icon: <Eye className="text-foreground" size={18} />,
        desc: "Người mắc tiểu đường nên khám mắt thường xuyên để phát hiện sớm các biến chứng như bệnh võng mạc, giúp ngăn ngừa mất thị lực lâu dài"
    },
    {
        id: 10,
        title: "Chăm sóc bàn chân",
        icon: <Heart className="text-foreground" size={18} />,
        desc: "Rửa sạch và kiểm tra bàn chân hàng ngày để phát hiện sớm các vết thương nhỏ, giúp phòng ngừa nhiễm trùng và biến chứng nghiêm trọng ở người tiểu đường"
    },
    {
        id: 11,
        title: "Hạn chế đồ uống có cồn",
        icon: <Beer className="text-foreground" size={18} />,
        desc: "Rượu bia có thể làm đường huyết dao động bất thường và gây tương tác với thuốc điều trị, đặc biệt nguy hiểm cho người mắc bệnh tiểu đường"
    },
    {
        id: 12,
        title: "Không bỏ bữa",
        icon: <UtensilsCrossed className="text-foreground" size={18} />,
        desc: "Không nên bỏ bữa vì điều này có thể khiến lượng đường huyết giảm đột ngột, gây chóng mặt, mệt mỏi và tăng nguy cơ hạ đường huyết nghiêm trọng"
    },
    {
        id: 13,
        title: "Ưu tiên thực phẩm có chỉ số GI thấp",
        icon: <UtensilsCrossed className="text-foreground" size={18} />,
        desc: "Thực phẩm có chỉ số đường huyết thấp được tiêu hóa chậm, giúp kiểm soát lượng đường trong máu hiệu quả và duy trì năng lượng ổn định lâu dài"
    },
    {
        id: 14,
        title: "Đọc nhãn thực phẩm",
        icon: <UtensilsCrossed className="text-foreground" size={18} />,
        desc: "Chú ý thành phần đường, carb và chất béo khi mua thực phẩm đóng gói",
    },
    {
        id: 15,
        title: "Không hút thuốc",
        icon: <Cigarette className="text-foreground" size={18} />,
        desc: "Luôn đọc kỹ nhãn thực phẩm để kiểm soát lượng đường, carbohydrate và chất béo, giúp bạn lựa chọn những sản phẩm phù hợp với chế độ ăn tiểu đường"
    },
    {
        id: 16,
        title: "Theo dõi cân nặng",
        icon: <Weight className="text-foreground" size={18} />,
        desc: "Giữ cân nặng ở mức phù hợp giúp cải thiện khả năng kiểm soát đường huyết, giảm nguy cơ biến chứng và hỗ trợ sức khỏe toàn diện cho người tiểu đường"
    },
    {
        id: 17,
        title: "Mang theo đồ ăn nhẹ",
        icon: <Sandwich className="text-foreground" size={18} />,
        desc: "Mang theo đồ ăn nhẹ như bánh quy hoặc trái cây khô để phòng ngừa hạ đường huyết khi vận động nhiều hoặc đang di chuyển bên ngoài"
    },
    {
        id: 18,
        title: "Tự kiểm tra huyết áp thường xuyên",
        icon: <Droplet className="text-foreground" size={18} />,
        desc: "Theo dõi huyết áp định kỳ giúp người tiểu đường phát hiện sớm nguy cơ tim mạch và điều chỉnh lối sống hoặc thuốc điều trị kịp thời"
    },
    {
        id: 19,
        title: "Tuân thủ chỉ định thuốc",
        icon: <Pill className="text-foreground" size={18} />,
        desc: "Luôn uống thuốc đúng liều và đúng thời điểm theo chỉ định của bác sĩ, không tự ý thay đổi hay ngừng thuốc để tránh biến chứng nguy hiểm"
    },
    {
        id: 20,
        title: "Khám định kỳ",
        icon: <ListChecks className="text-foreground" size={18} />,
        desc: "Việc tái khám định kỳ giúp bác sĩ theo dõi tình trạng tiểu đường, phát hiện sớm biến chứng và điều chỉnh phác đồ điều trị hiệu quả hơn"
    },
    {
        id: 21,
        title: "Tăng cường chất xơ",
        icon: <Apple className="text-foreground" size={18} />,
        desc: "Chất xơ giúp kiểm soát lượng đường trong máu bằng cách làm chậm quá trình hấp thụ đường và hỗ trợ hệ tiêu hóa hoạt động hiệu quả hơn"
    },
    {
        id: 22,
        title: "Sử dụng dầu thực vật",
        icon: <Droplet className="text-foreground" size={18} />,
        desc: "Hãy sử dụng các loại dầu như dầu ô liu, dầu hạt cải thay cho mỡ động vật để hỗ trợ kiểm soát cholesterol và bảo vệ tim mạch tốt hơn"
    },
    {
        id: 23,
        title: "Hạn chế muối",
        icon: <Droplet className="text-foreground" size={18} />,
        desc: "Tiêu thụ quá nhiều muối có thể dẫn đến tăng huyết áp, làm tăng nguy cơ biến chứng tim mạch ở người mắc bệnh tiểu đường"
    },
    {
        id: 24,
        title: "Chú ý vết thương nhỏ",
        icon: <Cross className="text-foreground" size={18} />,
        desc: "Ngay cả vết xước hay phỏng nhỏ, đặc biệt ở bàn chân, cũng cần được chăm sóc cẩn thận để tránh nhiễm trùng hoặc biến chứng nghiêm trọng"
    },
    {
        id: 25,
        title: "Ưu tiên thực phẩm tự nấu",
        icon: <Apple className="text-foreground" size={18} />,
        desc: "Việc tự nấu ăn tại nhà giúp kiểm soát lượng đường, muối và chất béo hiệu quả hơn, từ đó hỗ trợ ổn định đường huyết và sức khỏe tổng thể"
    },
    {
        id: 26,
        title: "Duy trì lịch sinh hoạt đều đặn",
        icon: <Heart className="text-foreground" size={18} />,
        desc: "Duy trì thời gian ăn uống, ngủ nghỉ đều đặn giúp cơ thể điều hòa insulin tốt hơn và hỗ trợ kiểm soát mức đường huyết hiệu quả hơn mỗi ngày"
    },
    {
        id: 27,
        title: "Theo dõi phản ứng sau ăn",
        icon: <UtensilsCrossed className="text-foreground" size={18} />,
        desc: "Ghi lại mức đường huyết sau mỗi bữa ăn để xác định những thực phẩm gây tăng đường nhanh, từ đó điều chỉnh chế độ ăn hợp lý hơn"
    },
    {
        id: 28,
        title: "Tập luyện nhẹ sau bữa ăn",
        icon: <Dumbbell className="text-foreground" size={18} />,
        desc: "Đi bộ chậm rãi từ 10 đến 15 phút sau bữa ăn giúp làm chậm quá trình tăng đường huyết, hỗ trợ kiểm soát lượng đường trong máu hiệu quả hơn"
    },
    {
        id: 29,
        title: "Hạn chế uống nước ngọt",
        icon: <CupSoda className="text-foreground" size={18} />,
        desc: "Nước ngọt chứa lượng đường đơn cao, dễ làm tăng đường huyết đột ngột và gây khó khăn trong việc kiểm soát bệnh tiểu đường hiệu quả"
    },
    {
        id: 30,
        title: "Giữ bình tĩnh khi lượng đường thay đổi",
        icon: <TrendingUp className="text-foreground" size={18} />,
        desc: "Khi lượng đường trong máu thay đổi, hãy giữ bình tĩnh, làm theo hướng dẫn bác sĩ thay vì hoảng sợ, để tránh làm tình trạng trở nên tệ hơn"
    },
    {
        id: 31,
        title: "Mang theo thẻ y tế",
        icon: <Cross className="text-foreground" size={18} />,
        desc: "Luôn mang theo thẻ y tế ghi rõ tình trạng tiểu đường để người xung quanh có thể hỗ trợ đúng cách trong trường hợp khẩn cấp"
    },
    {
        id: 32,
        title: "Dùng gia vị thay vì muối",
        icon: <Droplet className="text-foreground" size={18} />,
        desc: "Hạn chế muối bằng cách sử dụng các loại gia vị tự nhiên như gừng, tỏi hoặc nghệ để tăng hương vị mà vẫn tốt cho sức khỏe"
    },
    {
        id: 33,
        title: "Tránh thực phẩm nhiều chất bảo quản",
        icon: <UtensilsCrossed className="text-foreground" size={18} />,
        desc: "Thực phẩm chứa chất bảo quản thường có nhiều đường và chất béo không tốt, dễ làm tăng đường huyết và ảnh hưởng đến sức khỏe người tiểu đường"
    },
    {
        id: 34,
        title: "Luôn chuẩn bị sẵn thuốc",
        icon: <Pill className="text-foreground" size={18} />,
        desc: "Luôn giữ thuốc điều trị hoặc insulin trong túi cá nhân để đảm bảo có thể sử dụng ngay khi cần thiết, đặc biệt khi di chuyển hoặc khẩn cấp"
    },
    {
        id: 35,
        title: "Không tự ý dùng thuốc bổ",
        icon: <Pill className="text-foreground" size={18} />,
        desc: "Một số loại thuốc bổ có thể ảnh hưởng đến lượng đường huyết hoặc tương tác với thuốc điều trị tiểu đường nếu sử dụng mà không có chỉ định của bác sĩ"
    },
    {
        id: 36,
        title: "Hạn chế ngồi quá lâu",
        icon: <RockingChair className="text-foreground" size={18} />,
        desc: "Nếu phải ngồi làm việc lâu, hãy đứng dậy và vận động nhẹ nhàng sau mỗi 30-60 phút để hỗ trợ lưu thông máu và kiểm soát đường huyết tốt hơn"
    },
    {
        id: 37,
        title: "Theo dõi cholesterol",
        icon: <Droplet className="text-foreground" size={18} />,
        desc: "Kiểm tra mỡ máu thường xuyên giúp phát hiện sớm nguy cơ mắc bệnh tim mạch và có hướng điều chỉnh phù hợp để bảo vệ sức khỏe lâu dài"
    },
    {
        id: 38,
        title: "Tránh thức khuya",
        icon: <Moon className="text-foreground" size={18} />,
        desc: "Thức khuya có thể làm rối loạn nhịp sinh học, ảnh hưởng tiêu cực đến quá trình chuyển hóa insulin và gây biến động mức đường huyết theo thời gian"
    },
    {
        id: 39,
        title: "Chọn đồ ăn vặt thông minh",
        icon: <Sandwich className="text-foreground" size={18} />,
        desc: "Ưu tiên các món ăn vặt như hạt hạnh nhân, yaourt không đường và trái cây ít đường để kiểm soát đường huyết hiệu quả và tránh tăng đường đột ngột"
    },
    {
        id: 40,
        title: "Tập hít thở sâu mỗi ngày",
        icon: <Wind className="text-foreground" size={18} />,
        desc: "Hít thở sâu giúp thư giãn cơ thể, làm dịu hệ thần kinh, giảm căng thẳng và góp phần ổn định đường huyết cũng như tinh thần"
    },
    {
        id: 41,
        title: "Duy trì mục tiêu nhỏ",
        icon: <Check className="text-foreground" size={18} />,
        desc: "Hãy đặt ra những mục tiêu nhỏ, dễ thực hiện như đi bộ 15 phút mỗi ngày để tạo thói quen tốt và duy trì động lực lâu dài"
    },
    {
        id: 42,
        title: "Hạn chế sử dụng chất tạo ngọt nhân tạo",
        icon: <Candy className="text-foreground" size={18} />,
        desc: "Dùng quá nhiều chất tạo ngọt nhân tạo có thể ảnh hưởng tiêu cực đến hệ tiêu hóa và khả năng kiểm soát insulin của cơ thể"
    },
    {
        id: 43,
        title: "Tránh ăn khuya",
        icon: <Moon className="text-foreground" size={18} />,
        desc: "Ăn khuya có thể khiến mức đường huyết tăng cao vào buổi sáng hôm sau và ảnh hưởng đến hiệu quả kiểm soát bệnh tiểu đường"
    },
    {
        id: 44,
        title: "Giữ dụng cụ đo đường huyết sạch sẽ",
        icon: <Sparkles className="text-foreground" size={18} />,
        desc: "Luôn rửa tay và sát khuẩn trước khi đo để đảm bảo kết quả chính xác và tránh nhiễm khuẩn cho thiết bị đo"
    },
    {
        id: 45,
        title: "Không uống thuốc khi đói",
        icon: <Pill className="text-foreground" size={18} />,
        desc: "Một số loại thuốc điều trị tiểu đường nên được uống trong hoặc sau bữa ăn để hạn chế nguy cơ tụt đường huyết và tăng hiệu quả điều trị"
    },
    {
        id: 46,
        title: "Tham gia nhóm hỗ trợ",
        icon: <User className="text-foreground" size={18} />,
        desc: "Kết nối với những người cùng mắc tiểu đường giúp bạn chia sẻ kinh nghiệm, duy trì động lực và học hỏi cách kiểm soát bệnh hiệu quả hơn"
    },
    {
        id: 47,
        title: "Giữ tâm trạng tích cực",
        icon: <Smile className="text-foreground" size={18} />,
        desc: "Giữ tâm trạng tích cực giúp cơ thể phản ứng tốt hơn với điều trị, giảm căng thẳng và nâng cao chất lượng cuộc sống hàng ngày của người bệnh tiểu đường"
    },
    {
        id: 48,
        title: "Tránh tự so sánh với người khác",
        icon: <Heart className="text-foreground" size={18} />,
        desc: 'Mỗi người mắc bệnh có tiến trình và tình trạng khác nhau Hãy tập trung vào việc cải thiện sức khỏe cá nhân thay vì so sánh với người khác',
    },
    {
        id: 49,
        title: "Học cách đọc chỉ số y tế",
        icon: <Cross className="text-foreground" size={18} />,
        desc: 'Hiểu rõ các chỉ số như HbA1c, đường đói giúp bạn kiểm soát bệnh tiểu đường một cách chủ động và hiệu quả hơn trong cuộc sống hàng ngày',
    },
    {
        id: 50,
        title: "Tập viết nhật ký sức khỏe",
        icon: <PencilLine className="text-foreground" size={18} />,
        desc: 'Ghi chép các thay đổi về mức đường huyết và tâm trạng hàng ngày giúp bác sĩ theo dõi và điều chỉnh phương pháp điều trị phù hợp hơn',
    },
    {
        id: 51,
        title: "Thỉnh thoảng đổi món",
        icon: <UtensilsCrossed className="text-foreground" size={18} />,
        desc: 'Thay đổi các món ăn lành mạnh giúp bạn duy trì sự hứng thú trong chế độ ăn uống mà vẫn kiểm soát tốt đường huyết',
    },
    {
        id: 52,
        title: "Đo đường huyết cùng giờ mỗi ngày",
        icon: <Clock className="text-foreground" size={18} />,
        desc: 'Đo đường huyết cùng thời điểm hàng ngày giúp so sánh kết quả chính xác hơn và nhanh chóng phát hiện các dấu hiệu bất thường',
    },
    {
        id: 53,
        title: "Không nên bỏ qua bữa sáng",
        icon: <UtensilsCrossed className="text-foreground" size={18} />,
        desc: 'Bữa sáng giàu chất xơ và protein giúp duy trì đường huyết ổn định suốt cả ngày, hỗ trợ kiểm soát bệnh hiệu quả hơn',
    },
    {
        id: 54,
        title: "Dành thời gian ngoài trời",
        icon: <Sun className="text-foreground" size={18} />,
        desc: 'Ánh nắng sáng sớm giúp cơ thể bổ sung vitamin D tự nhiên và cải thiện tâm trạng, góp phần nâng cao sức khỏe tổng thể',
    },
    {
        id: 55,
        title: "Luôn có người thân biết cách xử lý",
        icon: <User className="text-foreground" size={18} />,
        desc: 'Luôn có người thân am hiểu cách xử lý khi bạn bị hạ đường huyết sẽ giúp bạn nhận được hỗ trợ kịp thời trong tình huống khẩn cấp',
    },
    {
        id: 56,
        title: "Giảm thời gian dùng thiết bị điện tử",
        icon: <TabletSmartphone className="text-foreground" size={18} />,
        desc: 'Hạn chế sử dụng thiết bị điện tử giúp tăng thời gian vận động, giảm căng thẳng và cải thiện chất lượng giấc ngủ hàng ngày',
    },
    {
        id: 57,
        title: "Theo dõi phản ứng với thực phẩm mới",
        icon: <UtensilsCrossed className="text-foreground" size={18} />,
        desc: 'Khi thử món ăn mới, bạn nên đo đường huyết để theo dõi ảnh hưởng và điều chỉnh chế độ ăn phù hợp nhằm kiểm soát bệnh tốt hơn',
    },
    {
        id: 58,
        title: "Sử dụng bát đĩa nhỏ",
        icon: <UtensilsCrossed className="text-foreground" size={18} />,
        desc: 'Dùng bát đĩa nhỏ giúp kiểm soát khẩu phần ăn tốt hơn, hạn chế ăn quá nhiều và hỗ trợ kiểm soát đường huyết hiệu quả',
    },
    {
        id: 59,
        title: "Tăng cường thực phẩm giàu magie",
        icon: <UtensilsCrossed className="text-foreground" size={18} />,
        desc: 'Magie giúp hỗ trợ kiểm soát insulin hiệu quả, có nhiều trong rau xanh, các loại đậu và hạt, góp phần cải thiện sức khỏe tổng thể',
    },
    {
        id: 60,
        title: "Không dùng lại kim lấy máu",
        icon: <Cross className="text-foreground" size={18} />,
        desc: 'Luôn sử dụng kim mới khi lấy máu để tránh nhiễm trùng và đảm bảo kết quả đo đường huyết chính xác hơn',
    },
    {
        id: 61,
        title: "Kiểm tra đường huyết khi cảm thấy lạ",
        icon: <Cross className="text-foreground" size={18} />,
        desc: 'Cảm thấy mệt mỏi bất thường hoặc hoa mắt có thể là dấu hiệu đường huyết thay đổi, nên kiểm tra ngay để xử lý kịp thời',
    },
    {
        id: 62,
        title: "Tìm hiểu về tiểu đường",
        icon: <Cross className="text-foreground" size={18} />,
        desc: 'Trang bị kiến thức đầy đủ giúp bạn chủ động và tích cực trong việc quản lý và sống chung hiệu quả với bệnh tiểu đường',
    },
    {
        id: 63,
        title: "Ưu tiên thực phẩm theo mùa",
        icon: <UtensilsCrossed className="text-foreground" size={18} />,
        desc: 'Thực phẩm theo mùa thường giàu dinh dưỡng hơn, ít thuốc bảo quản và giá cả phải chăng, giúp bạn duy trì chế độ ăn lành mạnh hiệu quả',
    },
    {
        id: 64,
        title: "Dùng ứng dụng theo dõi sức khỏe",
        icon: <Cross className="text-foreground" size={18} />,
        desc: 'Dùng ứng dụng để ghi lại mức đường huyết, hoạt động thể chất, chế độ ăn uống và theo dõi tiến triển sức khỏe một cách hiệu quả hơn',
    },
    {
        id: 65,
        title: "Cười mỗi ngày",
        icon: <Smile className="text-foreground" size={18} />,
        desc: 'Cười hàng ngày giúp giảm căng thẳng, cải thiện sức khỏe tinh thần và tạo cảm giác vui vẻ, tích cực trong cuộc sống',
    },
    {
        id: 66,
        title: "Không để bản thân quá đói",
        icon: <UtensilsCrossed className="text-foreground" size={18} />,
        desc: 'Đói quá mức dễ dẫn đến ăn bù và làm tăng đường huyết đột ngột, gây khó kiểm soát bệnh tiểu đường hiệu quả',
    },
    {
        id: 67,
        title: "Lựa chọn lối sống tích cực",
        icon: <Smile className="text-foreground" size={18} />,
        desc: "Tập trung vào những điều bạn có thể kiểm soát như chế độ ăn uống, giấc ngủ đều đặn, vận động hợp lý và duy trì tinh thần tích cực để tạo nền tảng vững chắc cho sức khỏe.",
    },
    {
        id: 68,
        title: "Tìm một thói quen thư giãn mỗi tối",
        icon: <Smile className="text-foreground" size={18} />,
        desc: "Thiết lập một thói quen thư giãn trước khi ngủ như uống trà thảo mộc, nghe nhạc nhẹ, thiền định hoặc đọc sách sẽ giúp cải thiện giấc ngủ và giảm căng thẳng hiệu quả.",
    },
    {
        id: 69,
        title: "Không ép bản thân quá mức",
        icon: <Heart className="text-foreground" size={18} />,
        desc: "Hãy thay đổi từng chút một, nhưng kiên trì và nhất quán. Những thay đổi nhỏ theo thời gian sẽ tạo nên kết quả lớn và bền vững hơn là ép bản thân quá mức cùng lúc.",
    },
    {
        id: 70,
        title: "Biết khi nào cần nghỉ ngơi",
        icon: <Moon className="text-foreground" size={18} />,
        desc: "Lắng nghe cơ thể và tâm trạng của bạn. Khi cảm thấy mệt mỏi, hãy dành thời gian nghỉ ngơi để phục hồi năng lượng, tránh tình trạng kiệt sức và suy giảm sức khỏe lâu dài.",
    }
]
