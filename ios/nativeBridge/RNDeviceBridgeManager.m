#import "RNDeviceBridgeManager.h"
#import "sys/utsname.h"
#import <CoreTelephony/CTCarrier.h> // 获取运营商信息
#import <CoreTelephony/CTTelephonyNetworkInfo.h>

@implementation RNDeviceBridgeManager

RCT_EXPORT_MODULE(AppDeviceInfo)
// 解决警告 - Module RNDeviceBridgeManager requires main queue setup since it overrides `constantsToExport` but doesn't implement `requiresMainQueueSetup`.
- (NSDictionary *)constantsToExport{
  NSDictionary *info = [[NSBundle mainBundle] infoDictionary];
  NSString *appName = [info objectForKey:@"CFBundleDisplayName"];
  NSString *appVersion = [info objectForKey:@"CFBundleShortVersionString"];
  CGRect rect = [[UIScreen mainScreen] bounds];
  CGSize size = rect.size;
  CGFloat width = size.width;
  CGFloat height = size.height;
  NSArray *screenSize =@[@(width), @(height)];
  CGFloat scale_screen = [UIScreen mainScreen].scale;
  NSArray *screenScale = @[@(width*scale_screen), @(height*scale_screen)];
  CTTelephonyNetworkInfo *info_tel = [[CTTelephonyNetworkInfo alloc] init];
  CTCarrier *carrier = info_tel.subscriberCellularProvider;
  NSDictionary *deviceInfo = @{
                               @"sysVersion": [[UIDevice currentDevice] systemVersion], // 手机系统版本
                               @"deviceId": [[[UIDevice currentDevice] identifierForVendor] UUIDString], // 设备唯一标识符
                               @"platformType": [[UIDevice currentDevice] systemName], // 设备名称
                               @"phoneName": [[UIDevice currentDevice] name], // 手机别名： 用户定义的名称
                               @"phoneType": [self deviceVersion], // 手机型号
                               @"localPhoneModel": [[UIDevice currentDevice] localizedModel], // 地方型号  （国际化区域名称）
                               @"size_screen": screenSize, // 物理尺寸
                               @"scale_screen": screenScale, // 分辨率
                               @"carrierName": carrier != nil ? carrier.carrierName : nil, // 运营商 -- 模拟器无运营商要特别处理，不然会闪退，nil时返回值里不包含本条信息
                               @"appVersion": appVersion, // 当前应用软件版本  比如：1.0.1
                               @"appBuild": [info objectForKey:@"CFBundleVersion"], // 当前应用版本Build值   int类型
                               @"appName": appName, // app名称
                               };
  return deviceInfo;
}

- (NSString *)deviceVersion{
  // 需要#import "sys/utsname.h"
  struct utsname systemInfo;
  uname(&systemInfo);
  NSString * deviceString = [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
  //iPhone
  if ([deviceString isEqualToString:@"iPhone3,1"])    return @"iPhone 4";
  if ([deviceString isEqualToString:@"iPhone3,2"])    return @"iPhone 4";
  if ([deviceString isEqualToString:@"iPhone3,3"])    return @"iPhone 4";
  if ([deviceString isEqualToString:@"iPhone4,1"])    return @"iPhone 4S";
  if ([deviceString isEqualToString:@"iPhone5,1"])    return @"iPhone 5";
  if ([deviceString isEqualToString:@"iPhone5,2"])    return @"iPhone 5 (GSM+CDMA)";
  if ([deviceString isEqualToString:@"iPhone5,3"])    return @"iPhone 5c (GSM)";
  if ([deviceString isEqualToString:@"iPhone5,4"])    return @"iPhone 5c (GSM+CDMA)";
  if ([deviceString isEqualToString:@"iPhone6,1"])    return @"iPhone 5s (GSM)";
  if ([deviceString isEqualToString:@"iPhone6,2"])    return @"iPhone 5s (GSM+CDMA)";
  if ([deviceString isEqualToString:@"iPhone7,1"])    return @"iPhone 6 Plus";
  if ([deviceString isEqualToString:@"iPhone7,2"])    return @"iPhone 6";
  if ([deviceString isEqualToString:@"iPhone8,1"])    return @"iPhone 6s";
  if ([deviceString isEqualToString:@"iPhone8,2"])    return @"iPhone 6s Plus";
  if ([deviceString isEqualToString:@"iPhone8,4"])    return @"iPhone SE";
  // 日行两款手机型号均为日本独占，可能使用索尼FeliCa支付方案而不是苹果支付
  if ([deviceString isEqualToString:@"iPhone9,1"])    return @"国行、日版、港行iPhone 7";
  if ([deviceString isEqualToString:@"iPhone9,2"])    return @"港行、国行iPhone 7 Plus";
  if ([deviceString isEqualToString:@"iPhone9,3"])    return @"美版、台版iPhone 7";
  if ([deviceString isEqualToString:@"iPhone9,4"])    return @"美版、台版iPhone 7 Plus";
  if ([deviceString isEqualToString:@"iPhone10,1"])   return @"iPhone_8";
  if ([deviceString isEqualToString:@"iPhone10,4"])   return @"iPhone_8";
  if ([deviceString isEqualToString:@"iPhone10,2"])   return @"iPhone_8_Plus";
  if ([deviceString isEqualToString:@"iPhone10,5"])   return @"iPhone_8_Plus";
  if ([deviceString isEqualToString:@"iPhone10,3"])   return @"iPhone_X";
  if ([deviceString isEqualToString:@"iPhone10,6"])   return @"iPhone_X";
  if ([deviceString isEqualToString:@"iPod1,1"])      return @"iPod Touch 1G";
  if ([deviceString isEqualToString:@"iPod2,1"])      return @"iPod Touch 2G";
  if ([deviceString isEqualToString:@"iPod3,1"])      return @"iPod Touch 3G";
  if ([deviceString isEqualToString:@"iPod4,1"])      return @"iPod Touch 4G";
  if ([deviceString isEqualToString:@"iPod5,1"])      return @"iPod Touch (5 Gen)";
  if ([deviceString isEqualToString:@"iPad1,1"])      return @"iPad";
  if ([deviceString isEqualToString:@"iPad1,2"])      return @"iPad 3G";
  if ([deviceString isEqualToString:@"iPad2,1"])      return @"iPad 2 (WiFi)";
  if ([deviceString isEqualToString:@"iPad2,2"])      return @"iPad 2";
  if ([deviceString isEqualToString:@"iPad2,3"])      return @"iPad 2 (CDMA)";
  if ([deviceString isEqualToString:@"iPad2,4"])      return @"iPad 2";
  if ([deviceString isEqualToString:@"iPad2,5"])      return @"iPad Mini (WiFi)";
  if ([deviceString isEqualToString:@"iPad2,6"])      return @"iPad Mini";
  if ([deviceString isEqualToString:@"iPad2,7"])      return @"iPad Mini (GSM+CDMA)";
  if ([deviceString isEqualToString:@"iPad3,1"])      return @"iPad 3 (WiFi)";
  if ([deviceString isEqualToString:@"iPad3,2"])      return @"iPad 3 (GSM+CDMA)";
  if ([deviceString isEqualToString:@"iPad3,3"])      return @"iPad 3";
  if ([deviceString isEqualToString:@"iPad3,4"])      return @"iPad 4 (WiFi)";
  if ([deviceString isEqualToString:@"iPad3,5"])      return @"iPad 4";
  if ([deviceString isEqualToString:@"iPad3,6"])      return @"iPad 4 (GSM+CDMA)";
  if ([deviceString isEqualToString:@"iPad4,1"])      return @"iPad Air (WiFi)";
  if ([deviceString isEqualToString:@"iPad4,2"])      return @"iPad Air (Cellular)";
  if ([deviceString isEqualToString:@"iPad4,4"])      return @"iPad Mini 2 (WiFi)";
  if ([deviceString isEqualToString:@"iPad4,5"])      return @"iPad Mini 2 (Cellular)";
  if ([deviceString isEqualToString:@"iPad4,6"])      return @"iPad Mini 2";
  if ([deviceString isEqualToString:@"iPad4,7"])      return @"iPad Mini 3";
  if ([deviceString isEqualToString:@"iPad4,8"])      return @"iPad Mini 3";
  if ([deviceString isEqualToString:@"iPad4,9"])      return @"iPad Mini 3";
  if ([deviceString isEqualToString:@"iPad5,1"])      return @"iPad Mini 4 (WiFi)";
  if ([deviceString isEqualToString:@"iPad5,2"])      return @"iPad Mini 4 (LTE)";
  if ([deviceString isEqualToString:@"iPad5,3"])      return @"iPad Air 2";
  if ([deviceString isEqualToString:@"iPad5,4"])      return @"iPad Air 2";
  if ([deviceString isEqualToString:@"iPad6,3"])      return @"iPad Pro 9.7";
  if ([deviceString isEqualToString:@"iPad6,4"])      return @"iPad Pro 9.7";
  if ([deviceString isEqualToString:@"iPad6,7"])      return @"iPad Pro 12.9";
  if ([deviceString isEqualToString:@"iPad6,8"])      return @"iPad Pro 12.9";
  
  if ([deviceString isEqualToString:@"AppleTV2,1"])      return @"Apple TV 2";
  if ([deviceString isEqualToString:@"AppleTV3,1"])      return @"Apple TV 3";
  if ([deviceString isEqualToString:@"AppleTV3,2"])      return @"Apple TV 3";
  if ([deviceString isEqualToString:@"AppleTV5,3"])      return @"Apple TV 4";
  
  if ([deviceString isEqualToString:@"i386"])         return @"Simulator";
  if ([deviceString isEqualToString:@"x86_64"])       return @"Simulator";
  
  return deviceString;
}
@end

作者：oc123
链接：https://www.jianshu.com/p/3cc46b823beb
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。