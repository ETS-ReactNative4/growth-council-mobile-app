package com.growthcouncil;

import com.facebook.react.ReactActivity;
import android.content.Intent;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "GrowthCouncil";
  }

  @Override
  public void onNewIntent(Intent intent) {
      setIntent(intent);
      super.onNewIntent(intent);
  }

}
