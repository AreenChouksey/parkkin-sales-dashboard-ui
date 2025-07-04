
import React, { useState, useEffect } from 'react';
import './SalesPage.css';

const Index = () => {
  const [activeTimeframe, setActiveTimeframe] = useState('daily');
  const [salesData, setSalesData] = useState({
    daily: {
      total: 15420,
      transactions: 342,
      growth: 12.5,
      data: [
        { period: 'Mon', amount: 2100 },
        { period: 'Tue', amount: 2300 },
        { period: 'Wed', amount: 1900 },
        { period: 'Thu', amount: 2500 },
        { period: 'Fri', amount: 2800 },
        { period: 'Sat', amount: 2200 },
        { period: 'Sun', amount: 1620 }
      ]
    },
    weekly: {
      total: 87450,
      transactions: 2156,
      growth: 18.3,
      data: [
        { period: 'Week 1', amount: 21200 },
        { period: 'Week 2', amount: 23400 },
        { period: 'Week 3', amount: 19800 },
        { period: 'Week 4', amount: 23050 }
      ]
    },
    monthly: {
      total: 324890,
      transactions: 8742,
      growth: 24.1,
      data: [
        { period: 'Jan', amount: 28400 },
        { period: 'Feb', amount: 31200 },
        { period: 'Mar', amount: 29800 },
        { period: 'Apr', amount: 33600 },
        { period: 'May', amount: 35200 },
        { period: 'Jun', amount: 32100 },
        { period: 'Jul', amount: 34200 },
        { period: 'Aug', amount: 36800 },
        { period: 'Sep', amount: 31400 },
        { period: 'Oct', amount: 35900 },
        { period: 'Nov', amount: 32800 },
        { period: 'Dec', amount: 34490 }
      ]
    },
    yearly: {
      total: 1247650,
      transactions: 32847,
      growth: 31.7,
      data: [
        { period: '2020', amount: 234500 },
        { period: '2021', amount: 456800 },
        { period: '2022', amount: 678900 },
        { period: '2023', amount: 892400 },
        { period: '2024', amount: 1247650 }
      ]
    }
  });

  const currentData = salesData[activeTimeframe];

  const StatCard = ({ title, value, icon, growth }) => (
    <div className="stat-card">
      <div className="stat-header">
        <h3>{title}</h3>
        <span className="stat-icon">{icon}</span>
      </div>
      <div className="stat-value">₹{value.toLocaleString()}</div>
      {growth && (
        <div className="stat-growth">
          <span className="growth-indicator">↗</span>
          +{growth}% from last period
        </div>
      )}
    </div>
  );

  const ChartBar = ({ data, maxValue }) => (
    <div className="chart-container">
      <div className="chart-bars">
        {data.map((item, index) => (
          <div key={index} className="bar-group">
            <div 
              className="chart-bar"
              style={{ 
                height: `${(item.amount / maxValue) * 100}%`,
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="bar-tooltip">
                <span>{item.period}</span>
                <span>₹{item.amount.toLocaleString()}</span>
              </div>
            </div>
            <span className="bar-label">{item.period}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="sales-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="brand">
            <img 
              src="https://www.ewaysservices.com/images/eways.jpg" 
              alt="Eways Services" 
              className="logo"
            />
            <div className="brand-text">
              <h1>At Parkkin</h1>
              <span>Super Admin Dashboard</span>
            </div>
          </div>
          <div className="header-actions">
            <button className="notification-btn">🔔</button>
            <div className="admin-profile">
              <div className="profile-avatar">SA</div>
              <span>Super Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="page-header">
          <h2>Sales Analytics</h2>
          <p>Comprehensive parking management revenue insights</p>
        </div>

        {/* Time Frame Selector */}
        <div className="timeframe-selector">
          {['daily', 'weekly', 'monthly', 'yearly'].map((timeframe) => (
            <button
              key={timeframe}
              className={`timeframe-btn ${activeTimeframe === timeframe ? 'active' : ''}`}
              onClick={() => setActiveTimeframe(timeframe)}
            >
              {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <StatCard
            title="Total Revenue"
            value={currentData.total}
            icon="💰"
            growth={currentData.growth}
          />
          <StatCard
            title="Transactions"
            value={currentData.transactions}
            icon="📊"
          />
          <StatCard
            title="Average per Transaction"
            value={Math.round(currentData.total / currentData.transactions)}
            icon="💳"
          />
          <StatCard
            title="Growth Rate"
            value={`${currentData.growth}%`}
            icon="📈"
          />
        </div>

        {/* Sales Chart */}
        <div className="chart-section">
          <div className="chart-header">
            <h3>Revenue Breakdown</h3>
            <div className="chart-legend">
              <span className="legend-item">
                <div className="legend-color"></div>
                Revenue
              </span>
            </div>
          </div>
          <ChartBar 
            data={currentData.data} 
            maxValue={Math.max(...currentData.data.map(d => d.amount))}
          />
        </div>

        {/* Additional Insights */}
        <div className="insights-grid">
          <div className="insight-card">
            <h4>Peak Hours</h4>
            <div className="peak-times">
              <div className="peak-item">
                <span className="time">9:00 AM - 11:00 AM</span>
                <span className="percentage">35%</span>
              </div>
              <div className="peak-item">
                <span className="time">2:00 PM - 4:00 PM</span>
                <span className="percentage">28%</span>
              </div>
              <div className="peak-item">
                <span className="time">6:00 PM - 8:00 PM</span>
                <span className="percentage">22%</span>
              </div>
            </div>
          </div>

          <div className="insight-card">
            <h4>Top Locations</h4>
            <div className="location-list">
              <div className="location-item">
                <span className="location-name">Downtown Mall</span>
                <span className="location-revenue">₹{(currentData.total * 0.32).toLocaleString()}</span>
              </div>
              <div className="location-item">
                <span className="location-name">Business District</span>
                <span className="location-revenue">₹{(currentData.total * 0.28).toLocaleString()}</span>
              </div>
              <div className="location-item">
                <span className="location-name">Airport Terminal</span>
                <span className="location-revenue">₹{(currentData.total * 0.25).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="insight-card">
            <h4>Payment Methods</h4>
            <div className="payment-methods">
              <div className="payment-item">
                <span className="method">Digital Wallet</span>
                <div className="method-bar">
                  <div className="method-fill" style={{width: '65%'}}></div>
                </div>
                <span className="method-percent">65%</span>
              </div>
              <div className="payment-item">
                <span className="method">Credit Card</span>
                <div className="method-bar">
                  <div className="method-fill" style={{width: '25%'}}></div>
                </div>
                <span className="method-percent">25%</span>
              </div>
              <div className="payment-item">
                <span className="method">Cash</span>
                <div className="method-bar">
                  <div className="method-fill" style={{width: '10%'}}></div>
                </div>
                <span className="method-percent">10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phone Mockup Section */}
        <div className="mockup-section">
          <div className="mockup-content">
            <div className="mockup-text">
              <h3>Parkkin Mobile App</h3>
              <p>Seamless parking experience for your customers</p>
              <div className="app-features">
                <div className="feature">✓ Real-time parking availability</div>
                <div className="feature">✓ Instant payment processing</div>
                <div className="feature">✓ QR code parking entry</div>
                <div className="feature">✓ Smart notifications</div>
              </div>
            </div>
            <div className="phone-mockup">
              <div className="phone-frame">
                <div className="phone-screen">
                  <div className="app-header">
                    <div className="app-logo">P</div>
                    <span>Parkkin</span>
                  </div>
                  <div className="app-content">
                    <div className="parking-spots">
                      <div className="spot available">A1</div>
                      <div className="spot occupied">A2</div>
                      <div className="spot available">A3</div>
                      <div className="spot available">A4</div>
                    </div>
                    <div className="app-buttons">
                      <button className="app-btn primary">Book Parking</button>
                      <button className="app-btn secondary">Pay Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
