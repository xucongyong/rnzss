package com.shop;

import com.facebook.react.ReactActivity;
import com.umeng.analytics.MobclickAgent;
import com.rnfs.RNFSPackage;
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    public void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
    }
    public void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }

    @Override
    protected String getMainComponentName() {
        return "shop";
    }

    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(), // <---- add comma
                new RNFSPackage() // <---------- add package
        );
    }
}
